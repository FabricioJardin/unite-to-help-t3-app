import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const groupRouter = createTRPCRouter({
  getPreviewList: publicProcedure.input(z.object({ query: z.string() })).query(() => {
    return [];
  }),
});
