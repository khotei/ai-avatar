import { required } from "@ai-avatar/dash"
import { eq } from "drizzle-orm"

import { database } from "@/lib/database"
import { DatabaseRecordNotFoundError } from "@/lib/database-errors"
import { findAvatarPersona } from "@/repositories/avatar-personas/find-avatar-personas-repository/find-avatar-personas-repository"
import { avatarInput } from "@/schema"
import { avatarPersona } from "@/schema/avatar-persona"

export const deleteAvatarPersona = async (id: string) => {
  const now = new Date()

  required(
    await findAvatarPersona(id),
    new DatabaseRecordNotFoundError(avatarInput, id)
  )

  await database
    .update(avatarPersona)
    .set({
      deletedAt: now,
    })
    .where(eq(avatarPersona.id, id))

  return id
}
