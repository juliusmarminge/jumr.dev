import { initTRPC } from "@trpc/server";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { z } from "zod";

import { env } from "~/lib/env.mjs";

const REPO = "juliusmarminge/jumr.dev";

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
  }).then(async (r) => (await r.json()).data as TResponse);

const appRouter = t.router({
  github: t.router({
    getDiscussionBySlug: t.procedure
      .input(
        z.object({
          slug: z.string(),
        }),
      )
      .query(async ({ input }) => {
        const gql = `
  {
    search(type: DISCUSSION query: "repo:${REPO} ${input.slug}" first: 1) {
      discussionCount
      nodes {
        ... on Discussion {
          id
          url
          reactions {
            totalCount
          }
        }
      }
    }
  }`;

        interface Response {
          search: {
            discussionCount: number;
            nodes: {
              id: string;
              url: string;
              reactions: {
                totalCount: number;
              };
            }[];
          };
        }

        const data = await fetchGithubGQL<Response>(gql, {}, env.GITHUB_TOKEN);

        console.log(data.search.nodes);

        return data;
      }),
  }),
});

export type AppRouter = typeof appRouter;

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
  onError: ({ error, path }) => `❌ ${path} ${error.message}`,
});
