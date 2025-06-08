import {
  partialRight,
  throwWhenError,
  tryit,
} from "@ai-avatar/dash"
import { throwTRPCErrorWhenMatch } from "@ai-avatar/rpc"

import { throwError } from "@/common/lib/throw-error"
import { updateAvatarInput } from "@/domain/avatar/update-avatar-input"
import { avatarInputUpdateInputSchema } from "@/server/avatar/update-avatar-input/update-avatar-input-schema"
import { protectedProcedure } from "@/server/rpc/rpc"

export const updateAvatarInputMutation = protectedProcedure
  .input(avatarInputUpdateInputSchema)
  .mutation(async (opts) => {
    const {
      ctx: { user },
      input,
    } = opts

    const [err, avatar] = await tryit(updateAvatarInput)({
      ...input,
      userId: user.id,
    })

    throwWhenError(
      err,
      partialRight(throwTRPCErrorWhenMatch, /not found/iu),
      throwError
    )

    return avatar
  })
