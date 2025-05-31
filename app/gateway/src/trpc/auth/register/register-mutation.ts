import { throwWhenError, tryit } from "@ai-avatar/dash"
import { z } from "zod"

import { registerUser } from "@/domain/auth/register-user"
import {
  throwError,
  throwUserAlreadyExistError,
} from "@/trpc/auth/register/register-mutatation-utils"
import { publicProcedure } from "@/trpc/lib/trpc"

export const registerMutation = publicProcedure
  .input(z.object({ email: z.string().email().min(3) }))
  .mutation(async (opts) => {
    const {
      input: { email },
    } = opts

    const [err, user] = await tryit(registerUser)(email)

    throwWhenError(
      err,
      throwUserAlreadyExistError,
      throwError
    )

    return user
  })
