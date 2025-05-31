import {
  partialRight,
  throwWhenError,
  tryit,
} from "@ai-avatar/dash"
import { z } from "zod"

import { loginUser } from "@/domain/auth/login-user"
import { throwError } from "@/lib/throw-error"
import { publicProcedure } from "@/trpc/core/trpc"
import { throwTRPCErrorWhenMatch } from "@/trpc/lib/throw-trpc-error-when-match"

export const loginMutation = publicProcedure
  .input(z.object({ email: z.string().email().min(3) }))
  .mutation(async (opts) => {
    const {
      input: { email },
    } = opts

    const [err, auth] = await tryit(loginUser)(email)

    throwWhenError(
      err,
      partialRight(
        throwTRPCErrorWhenMatch,
        /user not found/iu
      ),
      throwError
    )

    return auth
  })
