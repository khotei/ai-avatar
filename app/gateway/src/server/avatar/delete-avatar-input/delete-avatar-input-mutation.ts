import {
  partialRight,
  throwWhenError,
  tryit,
} from "@ai-avatar/dash"
import { throwTRPCErrorWhenMatch } from "@ai-avatar/rpc"

import { throwError } from "@/common/lib/throw-error"
import { deleteAvatarInput } from "@/domain/avatar/delete-avatar-input"
import { avatarInputDeleteInputSchema } from "@/server/avatar/delete-avatar-input/delete-avatar-input-schema"
import { protectedProcedure } from "@/server/rpc/rpc"

export const deleteAvatarInputMutation = protectedProcedure
  .input(avatarInputDeleteInputSchema)
  .mutation(async (opts) => {
    const {
      ctx: { user },
      input,
    } = opts

    const [err, deletedAvatar] = await tryit(deleteAvatarInput)({
      id: input.id,
      userId: user.id,
    })

    throwWhenError(
      err,
      partialRight(throwTRPCErrorWhenMatch, /not found/iu),
      throwError
    )

    return deletedAvatar
  })