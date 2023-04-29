import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  getPreviewList: publicProcedure.input(z.object({ query: z.string() })).query(() => {
    return [];
  }),

  getByGroup: protectedProcedure
    .input(z.object({ query: z.string(), groupId: z.string() }))
    .query(() => {
      return [];
    }),
});
