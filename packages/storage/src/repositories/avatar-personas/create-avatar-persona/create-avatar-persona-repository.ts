import { first, required } from "@ai-avatar/dash"
import type { InferInsertModel } from "drizzle-orm"

import { database } from "@/lib/database"
import { findAvatarPersona } from "@/repositories/avatar-personas/find-avatar-personas-repository/find-avatar-personas-repository"
import { avatarPersona } from "@/schema/avatar-persona"

export const createAvatarPersona = async (
  input: InferInsertModel<typeof avatarPersona>
) => {
  const { id } = required(
    first(
      await database
        .insert(avatarPersona)
        .values(input)
        .returning({ id: avatarPersona.id })
    )
  )

  return required(await findAvatarPersona({ id }))
}
