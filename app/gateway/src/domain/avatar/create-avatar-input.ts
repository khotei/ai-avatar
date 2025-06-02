import { ok } from "node:assert/strict"

import { createAvatarInput } from "@ai-avatar/storage"

export const createAvatar = async (
  userId: string,
  input: {
    age: number
    gender: string
    name: string
  }
) => {
  ok(userId, "User ID is required")
  ok(input.age, "Age is required")
  ok(input.gender, "Gender is required")
  ok(input.name, "Name is required")

  const avatar = await createAvatarInput({
    ...input,
    userId,
  })

  return {
    avatar,
  }
}
