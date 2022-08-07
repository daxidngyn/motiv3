import { createRouter } from "./context";
import { number, z } from "zod";
import { DateTime } from "luxon";
import { TRPCError } from "@trpc/server";
import { resolve } from "path";

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

      const newUsers = [...users, { id: owner }];

      const generateCheckpoints = [];
      for (let i = 0; i < daysInBetween; i++) {
        for (let idx in newUsers) {
          if (newUsers[idx]?.id === undefined) continue;
          generateCheckpoints.push({
            user: {
              connect: { id: newUsers[idx]?.id },
            },
            date: DateTime.now().plus({ days: i }).toJSDate(),
            completed: false,
          });
        }
      }

      console.log(generateCheckpoints);

      return await ctx.prisma.goal.create({
        data: {
          title: title,
          description: description,
          endDate: endDate,
          buyIn: buyIn,
          owner: {
            connect: { id: owner },
          },
          users: {
            connect: [...newUsers],
          },
          checkpoints: {
            create: [...generateCheckpoints],
          },
        },
      });
    },
  })
  .query("fetchAll", {
    input: z.string(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.findUnique({
        where: { id: input },
        select: { goals: true, name: true, id: true, joinedGoals: true },
      });
    },
  })
  .mutation("joinGoal", {
    input: z.object({
      userId: z.string(),
      goalId: z.string(),
      startDate: z.date(),
      endDate: z.date(),
    }),
    async resolve({ ctx, input }) {
      const differenceInDays = (startDate: Date, endDate: Date) => {
        let differenceInTime = startDate.getTime() - endDate.getTime();

        let differenceInDays = Math.round(
          differenceInTime / (1000 * 3600 * 24)
        );

        return differenceInDays;
      };

      function addDays(day1: Date, number_added_days: number) {
        let newDate = day1;
        newDate.setDate(day1.getDate() + number_added_days);
        return newDate;
      }

      const { startDate, endDate, userId, goalId } = input;

      let daysInBetween = differenceInDays(startDate, endDate);

      for (let i = 0; i < daysInBetween; i++) {
        await ctx.prisma.checkpoint.create({
          data: {
            user: {
              connect: { id: userId },
            },
            goal: {
              connect: { id: goalId },
            },
            date: addDays(startDate, i),
            completed: false,
          },
        });
      }

      return await ctx.prisma.goal.update({
        where: { id: input.goalId },
        //given the goalId we need to reference the rest of the data in the schema
        data: {
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });
    },
  }).mutation("voteForMyself", {
      input: z.object({
        userId: z.string(),
        goalId: z.string(),
        vote: z.boolean()
      }),

      async resolve({ctx, input}){

        let {userId, goalId, vote} = input;

        return await ctx.prisma.goal.update({
          where :{id: input.goalId},
          data:{
            users:{
              connect:{
                id: userId
              }
            },
            goal:{
              connect:{
                id: goalId
              }
            },
            completed: vote,
            userId: userId,
            goalId: goalId
          }
        })
      }
  })