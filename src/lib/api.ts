import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "~/app/api/trpc/[trpc]/route";

export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({ url: "/api/trpc" }),
        loggerLink({
          enabled: () => process.env.NODE_ENV === "development",
        }),
      ],
    };
  },
});

export type RouterOutputs = inferRouterOutputs<AppRouter>;
