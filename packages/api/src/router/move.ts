import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { dataInputBase } from "../inputs";

const createMoveInput = z.object({
  name: z.string(),
});

const createMoveSession = z.object({
  ...dataInputBase,
  moveId: z.string(),
});

export const moveRouter = router({
  create: protectedProcedure
    .input(createMoveInput)
    .mutation(({ ctx, input }) => {
      const { name } = input;
      return ctx.prisma.move.create({
        data: { name, userId: ctx.auth.userId },
      });
    }),
  list: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(10),
      }),
    )
    .query(({ ctx, input }) => {
      const { limit } = input;
      return ctx.prisma.move.findMany({
        take: limit,
      });
    }),
  createRecording: protectedProcedure
    .input(createMoveSession)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.session.create({
        data: { ...input, userId: ctx.auth.userId },
      });
    }),
});
