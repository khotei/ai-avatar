import {
  partialRight,
  throwWhenError,
  tryit,
} from "@ai-avatar/dash"
import { z } from "zod"

import { registerUser } from "@/domain/auth/register-user"
import { throwError } from "@/lib/throw-error"
import { publicProcedure } from "@/rpc/core/rpc"
import { throwTRPCErrorWhenMatch } from "@/rpc/utils/throw-trpc-error-when-match"

export const registerMutation = publicProcedure
  .input(z.object({ email: z.string().email().min(3) }))
  .mutation(async (opts) => {
    const {
      input: { email },
    } = opts

    const [err, auth] = await tryit(registerUser)(email)

    throwWhenError(
      err,
      partialRight(
        throwTRPCErrorWhenMatch,
        /user already exists/iu
      ),
      throwError
    )

    return auth
  })
