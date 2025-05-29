import { required } from "@ai-avatar/dash"
import { eq } from "drizzle-orm"

import { database } from "@/lib/database"
import { DatabaseRecordNotFoundError } from "@/lib/database-errors"
import { findAvatarPersona } from "@/repositories/avatar-personas/find-avatar-personas-repository/find-avatar-personas-repository"
import { avatarInput } from "@/schema"
import { avatarPersona } from "@/schema/avatar-persona"

export const deleteAvatarPersona = async (id: string) => {
  required(
    await findAvatarPersona(id),
    new DatabaseRecordNotFoundError(avatarInput, id)
  )

  await database
    .update(avatarPersona)
    .set({
      deletedAt: new Date(),
    })
    .where(eq(avatarPersona.id, id))

  return required(
    await database.query.avatarPersona.findFirst({
      where: eq(avatarPersona.id, id),
      with: {
        avatarInput: true,
        user: true,
      },
    }),
    new DatabaseRecordNotFoundError(avatarPersona, id)
  )
}
