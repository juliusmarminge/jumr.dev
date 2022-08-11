// src/server/router/index.ts
import { t } from "../utils";

import { twitterRouter } from "./twitter";

export const appRouter = t.router({
  twitter: twitterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
