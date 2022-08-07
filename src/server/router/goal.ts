import { createRouter } from "./context";
import { z } from "zod";
import { DateTime } from "luxon";
import { TRPCError } from "@trpc/server";

export const goalRouter = createRouter()
  .mutation("createGoal", {
    input: z.object({
      users: z.array(
        z.object({
          id: z.string(),
        })
      ),
      owner: z.string(),
      title: z.string(),
      description: z.string(),
      endDate: z.date(),
      buyIn: z.number(),
      daysInBetween: z.number(),
    }),
    async resolve({ ctx, input }) {
      if (
        !ctx.session ||
        !ctx.session.user?.id ||
        ctx.session.user?.id !== input.owner
      ) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const {
        owner,
        users,
        title,
        description,
        endDate,
        buyIn,
        daysInBetween,
      } = input;

      const newGoal = await ctx.prisma.goal.create({
        data: {
          title: title,
          description: description,
          endDate: endDate,
          buyIn: buyIn,
          owner: {
            connect: { id: owner },
          },
          users: {
            connect: [...users],
          },
        },
      });

      if (users.length === 0) return newGoal;

      const goalId = newGoal.id;

      for (let i = 0; i < daysInBetween; i++) {
        for (let idx in users) {
          await ctx.prisma.checkpoint.create({
            data: {
              user: {
                connect: { id: users[idx]?.id },
              },
              goal: {
                connect: { id: goalId },
              },
              date: DateTime.now().plus({ days: i }).toJSDate(),
              completed: false,
            },
          });
        }
      }

      return newGoal;
    },
  })
  .query("fetchAll", {
    input: z.string(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.findUnique({
        where: { id: input },
        select: { goals: true, name: true, id: true },
      });
    },
  });
