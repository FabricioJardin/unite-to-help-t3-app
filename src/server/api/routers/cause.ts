import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const causeRouter = createTRPCRouter({
  getAll: publicProcedure.input(z.optional(z.string())).query(({ ctx, input }) => {
    return ctx.prisma.cause.findMany({
      ...(input && {
        where: {
          OR: [
            {
              name: {
                contains: input,
              },
            },
          ],
        },
      }),
    });
  }),
});
