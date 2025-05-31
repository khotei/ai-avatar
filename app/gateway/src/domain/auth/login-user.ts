import { required } from "@ai-avatar/dash"
import { findUser } from "@ai-avatar/storage"

import { createUserToken } from "@/domain/auth/create-user-token"

export const loginUser = async (email: string) => {
  const user = required(
    await findUser({ email }),
    "User not found"
  )

  return {
    token: createUserToken(user.id),
    user,
  }
}
