import { deepEqual } from "node:assert/strict"
import { after, beforeEach, describe, it } from "node:test"

import { ary, first, pick, required } from "@ai-avatar/dash"

import { createUser } from "@/repositories/users/create-user/create-user-repository"
import {
  cleanDatabase,
  seedDatabase,
} from "@/utils/scripts/seed-database"
import { userTestInputs } from "@/utils/test-inputs/user-test-inputs"

describe("create-user-repository", () => {
  beforeEach(ary(seedDatabase, 0))
  after(ary(cleanDatabase, 0))

  it("should create user", async () => {
    const input = required(first(userTestInputs))

    const user = await createUser(input)

    deepEqual(user, {
      ...pick(user, [
        "createdAt",
        "id",
        "deletedAt",
        "updatedAt",
      ]),
      ...input,
    })
  })
})
