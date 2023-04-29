import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const causeRouter = createTRPCRouter({
  getList: publicProcedure.input(z.object({ query: z.string() })).query(() => {
    return [];
  }),
});
