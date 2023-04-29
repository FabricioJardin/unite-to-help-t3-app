import { createTRPCRouter } from "~/server/api/trpc";
import { causeRouter } from "~/server/api/routers/cause";
import { eventRouter } from "~/server/api/routers/event";
import { groupRouter } from "~/server/api/routers/group";
import { profileRouter } from "~/server/api/routers/profile";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  cause: causeRouter,
  event: eventRouter,
  group: groupRouter,
  profile: profileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
