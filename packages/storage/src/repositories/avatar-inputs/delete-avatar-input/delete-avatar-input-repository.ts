import {required} from "@ai-avatar/dash"
import {eq} from "drizzle-orm"

import {database} from "@/lib/database"
import {DatabaseRecordNotFoundError} from "@/lib/database-errors"
import {findAvatarInput} from "@/repositories/avatar-inputs/find-avatar-inputs/find-avatar-inputs-repository"
import {avatarInput} from "@/schema/avatar-input"

export const deleteAvatarInput = async (id: string) => {
  const now = new Date()

  required(
    await findAvatarInput(id),
    new DatabaseRecordNotFoundError(avatarInput, id)
  )

  await database
    .update(avatarInput)
    .set({
      deletedAt: now,
    })
    .where(eq(avatarInput.id, id))

  const deletedRow = required(await database
    .query.avatarInput.findFirst({
      where: eq(avatarInput.id, id),
      with: {
        avatarPersonas: true,
        user: true,
      },
    }))

  return deletedRow
}