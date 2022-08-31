import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export const t = initTRPC()({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});
