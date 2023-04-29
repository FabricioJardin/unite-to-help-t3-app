import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getData: protectedProcedure.query(() => {
    return "Olá, sou uma mensagem secreta";
  }),
});
