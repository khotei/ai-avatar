import { required } from "@ai-avatar/dash"
import { eq } from "drizzle-orm"

import { database } from "@/lib/database"
import { findAvatarInput } from "@/repositories/avatar-inputs/find-avatar-inputs/find-avatar-inputs-repository"
import { avatarInput } from "@/schema/avatar-input"

export const updateAvatarInput = async (
  id: string,
  params: Omit<
    typeof avatarInput.$inferInsert,
    "createdAt" | "userId"
  >
) => {
  const now = new Date()

  await database
    .update(avatarInput)
    .set({
      ...params,
      updatedAt: now,
    })
    .where(eq(avatarInput.id, id))

  return required(await findAvatarInput(id))
}
