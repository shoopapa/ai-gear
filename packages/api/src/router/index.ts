import { router } from "../trpc";
import { authRouter } from "./auth";
import { sessionRouter } from "./session";
import { moveRouter } from "./move";

export const appRouter = router({
  session: sessionRouter,
  auth: authRouter,
  move: moveRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
