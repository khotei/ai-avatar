import { ok } from "node:assert/strict"

import { createUser, findUser } from "@ai-avatar/storage"

import { createUserToken } from "@/domain/auth/create-user-token"

export const registerUser = async (email: string) => {
  ok(!(await findUser({ email })), "User already exists")

  const user = await createUser({ email })

  return {
    token: createUserToken(user.id),
    user,
  }
}
