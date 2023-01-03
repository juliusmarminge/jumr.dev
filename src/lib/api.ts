import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";

import { type AppRouter } from "~/pages/api/trpc/[trpc]";

export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [httpBatchLink({ url: "/api/trpc" })],
    };
  },
});
