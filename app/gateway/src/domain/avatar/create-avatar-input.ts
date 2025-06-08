import {
  type AvatarInputInsertSchema,
  createAvatarInput as createAvatarInputRepo,
} from "@ai-avatar/storage"

export const createAvatarInput = async (
  input: AvatarInputInsertSchema
) => {
  const avatar = await createAvatarInputRepo(input)

  return avatar
}
