import {
  type AvatarInputUpdateSchema,
  updateAvatarInput as updateAvatarInputRepo,
} from "@ai-avatar/storage"

import { getAvatarInputByUserId } from "@/domain/avatar/get-avatar-input-by-user-id"

export const updateAvatarInput = async (
  input: AvatarInputUpdateSchema &
    Required<Pick<AvatarInputUpdateSchema, "id" | "userId">>
) => {
  await getAvatarInputByUserId({
    id: input.id,
    userId: input.userId
  })

  const avatar = await updateAvatarInputRepo(
    input.id,
    input
  )

  return avatar
}
