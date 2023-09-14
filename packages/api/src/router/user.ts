import { protectedProcedure, publicProcedure, router } from "../trpc";
import { clerkClient } from "@clerk/nextjs/server";

export const userRouter = router({
  deleteUser: protectedProcedure.mutation(async ({ ctx: { auth, prisma } }) => {
    const userId = auth.userId;
    console.log("deleting account", userId, auth.user?.emailAddresses);
    prisma.session.deleteMany({ where: { userId } });
    prisma.move.deleteMany({ where: { userId } });
    await clerkClient.users.deleteUser(userId);
    return null;
  }),
});
