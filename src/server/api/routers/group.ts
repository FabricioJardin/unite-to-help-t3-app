import { z } from "zod"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { listInput } from "../shared/list-input"

export const groupRouter = createTRPCRouter({
  getList: publicProcedure
    .input(
      listInput.extend({
        causes: z.optional(z.array(z.string())),
      }),
    )
    .query(async ({ ctx, input: { query, page = 0, size = 20, causes } }) => {
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
          users: true,
        },
        take: size,
        skip: size * page,
      }

      const [items, total] = await ctx.prisma.$transaction([
        ctx.prisma.group.findMany(filters),
        ctx.prisma.group.count({ where: filters.where }),
      ])

      return {
        items,
        total,
      }
    }),
  getById: publicProcedure.input(z.string()).query(async ({ ctx: { prisma }, input }) => {
    return prisma.group.findFirstOrThrow({
      where: {
        id: input,
      },
      include: {
        causes: true,
        contacts: true,
        events: true,
        users: {
          include: {
            user: true,
          },
        },
        _count: true,
      },
    })
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        country: z.string(),
        zipCode: z.string(),
        causes: z.array(z.string()),
        contacts: z.array(
          z.object({
            type: z.enum(["PHONE", "EMAIL"]),
            value: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const { user } = session

      return await prisma.group.create({
        data: {
          country: input.country,
          description: input.description,
          name: input.name,
          zipCode: input.zipCode,
          causes: {
            connect: input.causes.map((id) => ({ id })),
          },
          contacts: {
            create: input.contacts.map(({ type, value }) => ({ type, value })),
          },
          users: {
            createMany: {
              data: {
                userId: user.id,
                role: "ADMIN",
              },
            },
          },
        },
        include: {
          causes: true,
          contacts: true,
        },
      })
    }),

  addUser: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const { user } = session

      return await prisma.usersOnGroups.create({
        data: {
          groupId: input,
          userId: user.id,
          role: "USER",
        },
        include: {
          group: true,
          user: true,
        },
      })
    }),
})
