import { initTRPC, TRPCError } from "@trpc/server";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { z } from "zod";

import { env } from "~/lib/env.mjs";

const t = initTRPC.create();

const fetchGithubGQL = <TResponse>(
  query: string,
  variables: Record<string, unknown>,
  token: string,
) =>
  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ query, variables }),
  }).then(async (r) => {
    if (!r.ok) {
      const text = await r.text();
      throw new Error(text);
    }
    return (await r.json()).data as TResponse;
  });

const appRouter = t.router({
  github: t.router({
    getDiscussionBySlug: t.procedure
      .input(
        z.object({
          repo: z.string(),
          slug: z.string(),
        }),
      )
      .query(async ({ input }) => {
        const searchQuery = `repo:${input.repo} in:title ${input.slug}`;
        const gql = `
  query ($query: String!, $first: Int!) {
    search(type: DISCUSSION, last: 1, query: $query) {
      discussionCount
      nodes {
        ... on Discussion {
          id
          url
          number
          reactions {
            totalCount
          }
          comments(first: $first) {
            nodes {
              id
              bodyHTML
              createdAt
              upvoteCount
              viewerHasUpvoted
              viewerCanUpvote
              author {
                avatarUrl
                login
                url
              }
              replies(first: $first) {
                nodes {
                  id
                  bodyHTML
                  createdAt
                  upvoteCount
                  viewerHasUpvoted
                  viewerCanUpvote
                  author {
                    avatarUrl
                    login
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;

        interface TResponse {
          search: {
            discussionCount: number;
            nodes: {
              id: string;
              url: string;
              number: number;
              reactions: {
                totalCount: number;
              };
              comments: {
                nodes: {
                  id: string;
                  createdAt: string;
                  bodyHTML: string;
                  upvoteCount: number;
                  viewerHasUpvoted: boolean;
                  viewerCanUpvote: boolean;
                  author: {
                    avatarUrl: string;
                    login: string;
                    url: string;
                  };
                  replies: {
                    nodes: {
                      id: string;
                      createdAt: string;
                      bodyHTML: string;
                      upvoteCount: number;
                      viewerHasUpvoted: boolean;
                      viewerCanUpvote: boolean;
                      author: {
                        avatarUrl: string;
                        login: string;
                        url: string;
                      };
                    }[];
                  };
                }[];
              };
            }[];
          };
        }

        const res = await fetchGithubGQL<TResponse>(
          gql,
          {
            query: searchQuery,
            first: 100,
          },
          env.GITHUB_TOKEN,
        );

        console.log(res);

        const discussion = res.search.nodes[0];
        if (!discussion) throw new TRPCError({ code: "NOT_FOUND" });

        const comments = discussion.comments.nodes.map((comment) => ({
          id: comment.id,
          likes: comment.upvoteCount,
          createdAt: comment.createdAt,
          bodyHTML: comment.bodyHTML,
          viewerHasUpvoted: comment.viewerHasUpvoted,
          viewerCanUpvote: comment.viewerCanUpvote,
          author: {
            avatarUrl: comment.author.avatarUrl,
            login: comment.author.login,
            url: comment.author.url,
          },
          replies: comment.replies.nodes.length
            ? comment.replies.nodes.map((reply) => ({
                id: reply.id,
                likes: reply.upvoteCount,
                createdAt: reply.createdAt,
                bodyHTML: reply.bodyHTML,
                viewerHasUpvoted: reply.viewerHasUpvoted,
                viewerCanUpvote: reply.viewerCanUpvote,
                author: {
                  avatarUrl: reply.author.avatarUrl,
                  login: reply.author.login,
                  url: reply.author.url,
                },
              }))
            : null,
        }));

        return {
          id: discussion.id,
          url: discussion.url,
          number: discussion.number,
          likes: discussion.reactions.totalCount,
          comments: comments,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
  onError: ({ error, path }) =>
    `❌ TRPC Error: ${path ?? "<no-path>"} ${error.message}`,
});
