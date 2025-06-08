import {
  deleteAvatarInput as deleteAvatarInputRepo,
} from "@ai-avatar/storage"

import { getAvatarInputByUserId } from "@/domain/avatar/get-avatar-input-by-user-id"

export const deleteAvatarInput = async (
  params: { id: string; userId: string }
) => {
  await getAvatarInputByUserId({
    id: params.id,
    userId: params.userId
  })

  const deletedAvatar = await deleteAvatarInputRepo(params.id)

  return deletedAvatar
}