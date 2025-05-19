import { first, required } from "@ai-avatar/dash"
import type { InferInsertModel } from "drizzle-orm"

import { database } from "@/lib/database"
import { findAvatarInput } from "@/repositories/avatar-inputs/find-avatar-inputs/find-avatar-inputs-repository"
import { avatarInput } from "@/schema/avatar-input"

export const createAvatarInput = async (
  input: InferInsertModel<typeof avatarInput>
) => {
  const { id } = required(
    first(
      await database
        .insert(avatarInput)
        .values(input)
        .returning({ id: avatarInput.id })
    )
  )

  return required(await findAvatarInput({ id }))
}
