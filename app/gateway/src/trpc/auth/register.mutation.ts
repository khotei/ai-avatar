import { z } from "zod"

import { registerUser } from "@/domain/auth/register-user"
import { publicProcedure } from "@/trpc/lib/trpc"

export const registerMutation = publicProcedure
  .input(z.object({ email: z.string() }))
  .mutation(async (opts) => {
    const {
      input: { email },
    } = opts

    return registerUser(email)
  })
