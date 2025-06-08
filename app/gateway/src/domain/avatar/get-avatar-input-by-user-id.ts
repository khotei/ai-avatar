import { first, required } from "@ai-avatar/dash"
import { findAvatarInputs } from "@ai-avatar/storage"

type GetAvatarInputByUserId = { id: string; userId: string };

export const getAvatarInputByUserId = async (
  params: GetAvatarInputByUserId,
) => {
  return required(
    first(
      await findAvatarInputs(
        { id: params.id, userId: params.userId },
        {limit: 1}
      )
    ),
    "Avatar input not found"
  )
}