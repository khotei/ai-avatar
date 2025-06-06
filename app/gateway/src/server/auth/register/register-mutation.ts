import {
  partialRight,
  throwWhenError,
  tryit,
} from "@ai-avatar/dash"
import { throwTRPCErrorWhenMatch } from "@ai-avatar/rpc"
import { z } from "zod"

import { throwError } from "@/common/lib/throw-error"
import { registerUser } from "@/domain/auth/register-user"
import { procedure } from "@/server/rpc/rpc"

export const registerMutation = procedure
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
