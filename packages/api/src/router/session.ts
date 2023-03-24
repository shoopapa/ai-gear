import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const saveSessionInput = z.object({
  gyroT: z.array(z.number()),
  gyroX: z.array(z.number()),
  gyroY: z.array(z.number()),
  gyroZ: z.array(z.number()),
  accelerationT: z.array(z.number()),
  accelerationX: z.array(z.number()),
  accelerationY: z.array(z.number()),
  accelerationZ: z.array(z.number()),
});
export const sessionRouter = router({
  create: protectedProcedure
    .input(saveSessionInput)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.session.create({ data: input });
    }),
});
