import { userInsertSchema } from "@ai-avatar/storage"

export const registerSchema = userInsertSchema.omit({
  id: true,
})
