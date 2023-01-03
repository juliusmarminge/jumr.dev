import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { inferRouterOutputs } from "@trpc/server";

import { type AppRouter } from "~/pages/api/trpc/[trpc]";

export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [httpBatchLink({ url: "/api/trpc" })],
    };
  },
});

export type RouterOutputs = inferRouterOutputs<AppRouter>;
