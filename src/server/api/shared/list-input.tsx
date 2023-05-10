import { z } from "zod"

export const listInput = z.object({
  query: z.optional(z.string()),
  page: z.optional(z.number()),
  size: z.optional(z.number()),
})
