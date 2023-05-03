import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { listInput } from "../shared/list-input";

export const eventRouter = createTRPCRouter({
  getList: publicProcedure
    .input(listInput)
    .query(async ({ ctx, input: { query, page = 1, size = 20 } }) => {
      const filters = {
        where: {
          ...(query && {
            OR: [
              {
                name: {
                  contains: query,
                },
              },
              {
                events: {
                  some: {
                    name: {
                      contains: query,
                    },
                  },
                },
              },
            ],
          }),
        },
        include: {
          causes: true,
          contacts: true,
        },
        take: size,
        skip: size * page,
      };

      const [items, total] = await ctx.prisma.$transaction([
        ctx.prisma.group.findMany(filters),
        ctx.prisma.group.count({ where: filters.where }),
      ]);

      return {
        items,
        total,
      };
    }),

  getByGroup: protectedProcedure
    .input(z.object({ query: z.string(), groupId: z.string() }))
    .query(() => {
      return [];
    }),
});
