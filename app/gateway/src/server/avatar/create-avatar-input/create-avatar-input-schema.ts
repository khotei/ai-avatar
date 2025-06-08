import { avatarInputInsertSchema } from "@ai-avatar/storage"

export const createAvatarInputSchema =
  avatarInputInsertSchema.omit({ id: true, userId: true })
