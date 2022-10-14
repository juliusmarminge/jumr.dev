// src/server/router/index.ts
import { t } from "../utils";
import { githubRouter } from "./github";
import { twitterRouter } from "./twitter";

export const appRouter = t.router({
  twitter: twitterRouter,
  github: githubRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
