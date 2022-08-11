import superjson from "superjson";
import { initTRPC } from "@trpc/server";

export const t = initTRPC()({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});
