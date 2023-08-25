import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { randomName } from "../utils/random-name";
import { Prisma } from "@acme/db";

const createSessionInput = z.object({
  gyroT: z.array(z.number()),
  gyroX: z.array(z.number()),
  gyroY: z.array(z.number()),
  gyroZ: z.array(z.number()),
  accelerationT: z.array(z.number()),
  accelerationX: z.array(z.number()),
  accelerationY: z.array(z.number()),
  accelerationZ: z.array(z.number()),
  name: z.string().optional(),
});

export const sessionRouter = router({
  deleteById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.session.delete({
        where: {
          id: input.id, //possible security vuln, where signed in users can delete any record, not just their own
        },
      });
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.session.findFirst({
        where: {
          id: input.id,
          userId: ctx.auth.userId,
        },
      });
    }),
  recent: protectedProcedure
    .input(z.object({ limit: z.number(), moveId: z.string().optional() }))
    .query(({ ctx, input }) => {
      const where: Prisma.SessionFindFirstArgs["where"] = {
        userId: ctx.auth.userId,
        moveId: null,
      };
      if (input.moveId) {
        where.moveId = input.moveId;
      }
      return ctx.prisma.session.findMany({
        where,
        select: {
          name: true,
          id: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: input.limit,
      });
    }),
  recentWithDisplayData: protectedProcedure
    .input(z.object({ limit: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.session.findMany({
        where: {
          userId: ctx.auth.userId,
        },
        select: {
          name: true,
          id: true,
          createdAt: true,
          accelerationX: true,
        },
        orderBy: { createdAt: "desc" },
        take: input.limit,
      });
    }),
  create: protectedProcedure
    .input(createSessionInput)
    .mutation(({ ctx, input }) => {
      const name = input.name ?? randomName();
      return ctx.prisma.session.create({
        data: { ...input, userId: ctx.auth.userId, name },
      });
    }),
  editName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(({ ctx, input: { id, name } }) => {
      if (name === "") {
        name = randomName();
      }
      return ctx.prisma.session.update({
        where: { id },
        data: { name },
      });
    }),
});
