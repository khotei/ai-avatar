import { partialDeepStrictEqual } from "node:assert/strict"
import { afterEach, describe, it } from "node:test"

import {
  first,
  merge,
  required,
  unary,
} from "@ai-avatar/dash"

import { createAvatarInput } from "@/repositories/avatar-inputs/create-avatar-input/create-avatar-input-repository"
import { cleanSeed } from "@/utils/scripts/seed-database"
import { avatarInputTestInputs } from "@/utils/test-inputs/avatar-input-test-inputs"
import { createTestUsers } from "@/utils/test-utils/create-test-users"

describe("create-avatar-input-repository", () => {
  afterEach(unary(cleanSeed))

  it("should create avatar input", async () => {
    const [userRow] = await createTestUsers()

    const input = merge(
      {
        userId: userRow.id,
      },
      required(first(avatarInputTestInputs))
    )

    const avatarInputRow = await createAvatarInput(input)

    partialDeepStrictEqual(avatarInputRow, {
      user: userRow,
      ...input,
    })
  })
})
