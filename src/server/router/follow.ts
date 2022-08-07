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
