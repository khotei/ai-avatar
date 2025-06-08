import { userInsertSchema } from "@ai-avatar/storage"

export const loginSchema = userInsertSchema.omit({
  id: true,
})
