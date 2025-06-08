import {
  partialRight,
  throwWhenError,
  tryit,
} from "@ai-avatar/dash"
import { throwTRPCErrorWhenMatch } from "@ai-avatar/rpc"

import { throwError } from "@/common/lib/throw-error"
import { loginUser } from "@/domain/auth/login-user"
import { loginSchema } from "@/server/auth/login/login-schema"
import { procedure } from "@/server/rpc/rpc"

export const loginMutation = procedure
  .input(loginSchema)
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
