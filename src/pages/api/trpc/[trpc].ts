import { initTRPC, TRPCError } from "@trpc/server";
import { NextApiRequest, NextApiResponse } from "next";
// import { createNextApiHandler } from "@trpc/server/adapters/next";
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
      // console.error(r);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
    const data = await r.json();
    if ("data" in data) return data.data as TResponse;
    return data as TResponse;
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
          upvoteCount
          reactions (content:THUMBS_UP) {
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
              reactions (content:THUMBS_UP) {
                totalCount
                viewerHasReacted
              }
              replies(first: $first) {
                nodes {
                  id
                  bodyHTML
                  createdAt
                  upvoteCount
                  viewerHasUpvoted
                  viewerCanUpvote
                  reactions (content:THUMBS_UP) {
                    totalCount
                    viewerHasReacted
                  }
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
              upvoteCount: number;
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
                  reactions: {
                    totalCount: number;
                    viewerHasReacted: boolean;
                  };
                  replies: {
                    nodes: {
                      id: string;
                      createdAt: string;
                      bodyHTML: string;
                      upvoteCount: number;
                      viewerHasUpvoted: boolean;
                      viewerCanUpvote: boolean;
                      reactions: {
                        totalCount: number;
                        viewerHasReacted: boolean;
                      };
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

        const discussion = res.search.nodes[0];
        if (!discussion) throw new TRPCError({ code: "NOT_FOUND" });

        const comments = discussion.comments.nodes.map((comment) => ({
          id: comment.id,
          likes: comment.upvoteCount + comment.reactions.totalCount,
          createdAt: comment.createdAt,
          bodyHTML: comment.bodyHTML,
          viewerHasUpvoted:
            comment.viewerHasUpvoted || comment.reactions.viewerHasReacted,
          viewerCanUpvote:
            comment.viewerCanUpvote && !comment.reactions.viewerHasReacted,
          author: {
            avatarUrl: comment.author.avatarUrl,
            login: comment.author.login,
            url: comment.author.url,
          },
          isReply: false,
          replies: comment.replies.nodes.map((reply) => ({
            id: reply.id,
            isReply: true,
            likes: reply.upvoteCount + reply.reactions.totalCount,
            createdAt: reply.createdAt,
            bodyHTML: reply.bodyHTML,
            viewerHasUpvoted:
              reply.viewerHasUpvoted || reply.reactions.viewerHasReacted,
            viewerCanUpvote:
              reply.viewerCanUpvote && !reply.reactions.viewerHasReacted,
            author: {
              avatarUrl: reply.author.avatarUrl,
              login: reply.author.login,
              url: reply.author.url,
            },
          })),
        }));

        return {
          id: discussion.id,
          url: discussion.url,
          number: discussion.number,
          likes: discussion.reactions.totalCount + discussion.upvoteCount,
          comments: comments,
        };
      }),

    likeComment: t.procedure
      .input(
        z.object({
          id: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        const gql = `
  mutation ($id: ID!) {
    addReaction(input: {subjectId: $id, content: THUMBS_UP}) {
      reaction {
        id
      }
    }
  }`;

        await fetchGithubGQL(gql, { id: input.id }, env.GITHUB_TOKEN);
      }),

    createComment: t.procedure
      .input(
        z.object({
          discussionId: z.string(),
          body: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        const gql = `
          mutation ($discussionId: ID!, $body: String!) {
            addDiscussionComment(input: {discussionId: $discussionId, body: $body}) {
    	        comment {
                author {
                  login
                }
                body
              }
            }
          }`;

        const res = await fetchGithubGQL(
          gql,
          {
            discussionId: input.discussionId,
            body: input.body,
          },
          env.GITHUB_TOKEN,
        );

        console.log(res);
      }),

    replyToComment: t.procedure
      .input(
        z.object({
          discussionId: z.string(),
          commentId: z.string(),
          body: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        const gql = `
          mutation ($discussionId: ID!, $body: String!, $commentId: ID) {
            addDiscussionComment(input: {discussionId: $discussionId, body: $body, replyToId: $commentId}) {
    	        comment {
                author {
                  login
                }
                body
              }
            }
          }`;

        // console.log(input);

        const res = await fetchGithubGQL(
          gql,
          {
            discussionId: input.discussionId,
            commentId: input.commentId,
            body: input.body,
          },
          env.GITHUB_TOKEN,
        );

        console.log(res);
      }),
  }),
});

export type AppRouter = typeof appRouter;

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json("trpc not activated");

  // createNextApiHandler({
  //   router: appRouter,
  //   createContext: () => ({}),
  //   onError: ({ error, path }) =>
  //     `❌ TRPC Error: ${path ?? "<no-path>"} ${error.message}`,
  // })(req, res);
};
