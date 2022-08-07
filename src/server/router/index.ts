// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { goalRouter } from "./goal";
import { followRouter } from "./follow";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("follow.", followRouter)
  .merge("goal.", goalRouter)
  .merge("user.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
