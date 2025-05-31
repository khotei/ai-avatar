import { z } from "zod"

import { registerUser } from "@/domain/auth/register-user"
import {
  isUserAlreadyExistError,
  throwUnknownError,
  throwUserAlreadyExistError,
} from "@/trpc/auth/register/register-mutatation-utils"
import { publicProcedure } from "@/trpc/lib/trpc"

export const registerMutation = publicProcedure
  .input(z.object({ email: z.string() }))
  .mutation(async (opts) => {
    const {
      input: { email },
    } = opts

    try {
      return await registerUser(email)
    } catch (error) {
      isUserAlreadyExistError(
        error,
        throwUserAlreadyExistError,
        throwUnknownError
      )
    }
  })
