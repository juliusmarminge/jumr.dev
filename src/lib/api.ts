import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "~/app/api/trpc/[trpc]/route";

/**
 * Not currently used - thinking of adding comments to the blog
 * and then I'll use trpc to communicate with Github Discussions
 */
export const api = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({ url: "/api/trpc" }),
    loggerLink({
      enabled: () => process.env.NODE_ENV === "development",
    }),
  ],
});

export type RouterOutputs = inferRouterOutputs<AppRouter>;
