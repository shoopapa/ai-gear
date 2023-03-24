import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { sessionRouter } from "./session";

export const appRouter = router({
  post: postRouter,
  session: sessionRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
