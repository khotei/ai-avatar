import { avatarInputUpdateSchema } from "@ai-avatar/storage"

export const avatarInputUpdateInputSchema =
  avatarInputUpdateSchema
    .pick({ id: true })
    .required()
    .extend(
      avatarInputUpdateSchema.omit({
        id: true,
        userId: true,
      }).shape
    )
