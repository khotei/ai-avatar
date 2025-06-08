import { first, required } from "@ai-avatar/dash"
import {
  type AvatarInputUpdateSchema,
  findAvatarInputs,
  updateAvatarInput as updateAvatarInputRepo,
} from "@ai-avatar/storage"

export const updateAvatarInput = async (
  input: AvatarInputUpdateSchema &
    Required<Pick<AvatarInputUpdateSchema, "id" | "userId">>
) => {
  required(
    first(
      await findAvatarInputs(
        { id: input.id, userId: input.userId },
        { limit: 1 }
      )
    ),
    "Avatar input not found"
  )

  const avatar = await updateAvatarInputRepo(
    input.id,
    input
  )

  return avatar
}
