import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { listInput } from "../shared/list-input";

export const groupRouter = createTRPCRouter({
  getList: publicProcedure
    .input(
      listInput.extend({
        causes: z.optional(z.array(z.string())),
      }),
    )
    .query(async ({ ctx, input: { query, page = 1, size = 20, causes } }) => {
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
              {
                causes: {
                  some: {
                    name: {
                      contains: query,
                    },
                  },
                },
              },
            ],
          }),
          ...(causes && {
            causes: {
              some: {
                id: {
                  in: causes,
                },
              },
            },
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
});
