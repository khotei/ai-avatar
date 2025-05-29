import { ok } from "assert/strict"

import { createUser, findUser } from "@ai-avatar/storage"

export const registerUser = async (email: string) => {
  ok(!(await findUser({ email })), "User already exists")

  return createUser({ email })
}
