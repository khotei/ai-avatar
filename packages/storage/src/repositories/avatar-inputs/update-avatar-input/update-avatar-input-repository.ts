import {
  type RequireAtLeastOne,
  required,
} from "@ai-avatar/dash"
import { eq } from "drizzle-orm"

import { database } from "@/lib/database"
import { DatabaseRecordNotFoundError } from "@/lib/database-errors"
import { findAvatarInput } from "@/repositories/avatar-inputs/find-avatar-inputs/find-avatar-inputs-repository"
import { avatarInput } from "@/schema/avatar-input"

export const updateAvatarInput = async (
  id: string,
  params: RequireAtLeastOne<
    Omit<
      typeof avatarInput.$inferInsert,
      "createdAt" | "deletedAt" | "userId"
    >
  >
) => {
  required(
    await findAvatarInput(id),
    new DatabaseRecordNotFoundError(avatarInput, id)
  )

  await database
    .update(avatarInput)
    .set({
      ...params,
      updatedAt: new Date(),
    })
    .where(eq(avatarInput.id, id))

  return required(await findAvatarInput(id))
}
