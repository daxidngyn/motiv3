import { createRouter } from "./context";
import { z } from "zod";

export const userRouter = createRouter().query("getMatches", {
  input: z.string(),
  async resolve({ ctx, input }) {
    return await ctx.prisma.user.findMany({
      where: {
        email: {
          startsWith: input,
        },
      },
    });
  },
});
