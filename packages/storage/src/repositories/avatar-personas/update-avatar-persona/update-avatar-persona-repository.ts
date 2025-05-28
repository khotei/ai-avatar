import { required } from "@ai-avatar/dash"
import { eq } from "drizzle-orm"

import { database } from "@/lib/database"
import { findAvatarPersona } from "@/repositories/avatar-personas/find-avatar-personas-repository/find-avatar-personas-repository"
import { avatarPersona } from "@/schema/avatar-persona"

export const updateAvatarPersona = async (
  id: string,
  params: Omit<
    typeof avatarPersona.$inferInsert,
    "avatarInputId" | "createdAt" | "userId"
  >
) => {
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
