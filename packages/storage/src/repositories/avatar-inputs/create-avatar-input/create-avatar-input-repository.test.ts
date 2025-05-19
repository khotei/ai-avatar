import { deepEqual } from "node:assert/strict"
import { after, beforeEach, describe, it } from "node:test"

import {
  ary,
  first,
  merge,
  pick,
  required,
} from "@ai-avatar/dash"

import { createAvatarInput } from "@/repositories/avatar-inputs/create-avatar-input/create-avatar-input-repository"
import {
  cleanDatabase,
  seedDatabase,
} from "@/utils/scripts/seed-database"
import { avatarInputTestInputs } from "@/utils/test-inputs/avatar-input-test-inputs"
import { createTestUsers } from "@/utils/test-utils/create-test-users"

describe("create-avatar-input-repository", () => {
  beforeEach(ary(seedDatabase, 0))
  after(ary(cleanDatabase, 0))

  it("should create avatar input", async () => {
    const [userRow] = await createTestUsers()

    const input = merge(
      {
        userId: userRow.id,
      },
      required(first(avatarInputTestInputs))
    )

    const avatarInputRow = await createAvatarInput(input)

    deepEqual(avatarInputRow, {
      ...pick(avatarInputRow, [
        "createdAt",
        "id",
        "deletedAt",
        "updatedAt",
      ]),
      ...input,
    })
  })
})
