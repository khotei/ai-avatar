import {
  partialRight,
  throwWhenError,
  tryit,
} from "@ai-avatar/dash"
import { throwTRPCErrorWhenMatch } from "@ai-avatar/rpc"
import { z } from "zod"

import { throwError } from "@/common/lib/throw-error"
import { createAvatar } from "@/domain/avatar/create-avatar-input"
import { protectedProcedure } from "@/server/rpc/rpc"

export const createAvatarMutation = protectedProcedure
  .input(
    z.object({
      age: z.number().int().positive(),
      gender: z.string().min(1),
      name: z.string().min(1),
    })
  )
  .mutation(async (opts) => {
    const {
      ctx: { user },
      input,
    } = opts

    const [err, result] = await tryit(createAvatar)(
      user.id,
      input
    )

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
