import {
  type RequireAtLeastOne,
  required,
} from "@ai-avatar/dash"
import { eq } from "drizzle-orm"

import { database } from "@/lib/database"
import { DatabaseRecordNotFoundError } from "@/lib/database-errors"
import { findAvatarPersona } from "@/repositories/avatar-personas/find-avatar-personas-repository/find-avatar-personas-repository"
import { avatarPersona } from "@/schema/avatar-persona"

export const updateAvatarPersona = async (
  id: string,
  params: RequireAtLeastOne<
    Omit<
      typeof avatarPersona.$inferInsert,
      "avatarInputId" | "createdAt" | "deletedAt" | "userId"
    >
  >
) => {
  required(
    await findAvatarPersona(id),
    new DatabaseRecordNotFoundError(avatarPersona, id)
  )

  const now = new Date()

  await database
    .update(avatarPersona)
    .set({
      ...params,
      updatedAt: now,
    })
    .where(eq(avatarPersona.id, id))

  return required(await findAvatarPersona(id))
}
