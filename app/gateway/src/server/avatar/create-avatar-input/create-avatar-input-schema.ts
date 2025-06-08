import { avatarInputInsertSchema } from "@ai-avatar/storage"

export const avatarInputCreateInputSchema =
  avatarInputInsertSchema.omit({ id: true, userId: true })
