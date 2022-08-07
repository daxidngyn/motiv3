import { createProtectedRouter } from "./protected-router";
import { z } from "zod";

// Example router with queries that can only be hit if the user requesting is signed in
export const followRouter = createProtectedRouter()
  .query("getFollowing", {
    input: z.string(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.findUnique({
        where: {
          id: input,
        },
        select: {
          followedBy: true,
          following: true,
        },
      });
    },
  })
  .query("getFollowingFeed", {
    input: z.object({
      userId: z.string(),
      limit: z.number().nullish(),
    }),
    async resolve({ ctx, input }) {
      // @ts-ignore
      const { following } = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
        select: {
          following: {
            select: {
              id: true,
            },
          },
        },
      });

      // @ts-ignore
      const followingIds = following.map((user) => user.id);

      return await ctx.prisma.goal.findMany({
        where: {
          ownerId: {
            in: [...followingIds],
          },
        },
        select: {
          id: true,
          title: true,
          owner: true,
          createdAt: true,
          endDate: true,
          description: true,
          buyIn: true,
          users: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  })
  .mutation("followUser", {
    input: z.object({
      userId: z.string(),
      targetId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          following: {
            connect: {
              id: input.targetId,
            },
          },
        },
      });
    },
  })
  .mutation("unfollowUser", {
    input: z.object({
      userId: z.string(),
      targetId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          following: {
            disconnect: {
              id: input.targetId,
            },
          },
        },
      });
    },
  });
