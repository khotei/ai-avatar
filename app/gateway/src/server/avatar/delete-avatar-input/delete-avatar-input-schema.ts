import { z } from "zod"

export const avatarInputDeleteInputSchema = z.object({
  id: z.string().uuid(),
})