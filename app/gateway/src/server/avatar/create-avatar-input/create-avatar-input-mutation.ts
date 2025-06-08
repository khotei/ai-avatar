import {
  partialRight,
  throwWhenError,
  tryit,
} from "@ai-avatar/dash"
import { throwTRPCErrorWhenMatch } from "@ai-avatar/rpc"

import { throwError } from "@/common/lib/throw-error"
import { createAvatarInput } from "@/domain/avatar/create-avatar-input"
import { createAvatarInputSchema } from "@/server/avatar/create-avatar-input/create-avatar-input-schema"
import { protectedProcedure } from "@/server/rpc/rpc"

export const createAvatarInputMutation = protectedProcedure
  .input(createAvatarInputSchema)
  .mutation(async (opts) => {
    const {
      ctx: { user },
      input,
    } = opts

    const [err, result] = await tryit(createAvatarInput)({
      ...input,
      userId: user.id,
    })

    throwWhenError(
      err,
      partialRight(
        throwTRPCErrorWhenMatch,
        /user id is required/iu
      ),
      throwError
    )

    return result
  })
