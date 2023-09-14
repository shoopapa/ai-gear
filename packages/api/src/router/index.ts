import { router } from "../trpc";
import { userRouter } from "./user";
import { sessionRouter } from "./session";
import { moveRouter } from "./move";

export const appRouter = router({
  user: userRouter,
  session: sessionRouter,
  move: moveRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
