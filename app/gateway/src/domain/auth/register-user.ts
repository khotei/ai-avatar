import { createUser } from "@ai-avatar/storage"

export const registerUser = (email: string) =>
  createUser({ email })
