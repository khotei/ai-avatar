import { deepEqual } from "node:assert/strict"
import { after, beforeEach, describe, it } from "node:test"

import { ary, castArray, size } from "@ai-avatar/dash"

import {
  findUser,
  findUsers,
} from "@/repositories/users/find-users/find-users-repository"
import {
  cleanDatabase,
  seedDatabase,
} from "@/utils/scripts/seed-database"
import { createTestUsers } from "@/utils/test-utils/create-test-users"

describe("find-users-repository", () => {
  beforeEach(ary(seedDatabase, 0))
  after(ary(cleanDatabase, 0))

  it("should find user by email", async () => {
    const [createdUserRow] = await createTestUsers()

    const userRow = await findUser({
      email: createdUserRow.email,
    })

    deepEqual(userRow, createdUserRow)
  })

  it("should find user by id", async () => {
    const [createdUserRow] = await createTestUsers()

    const userRow = await findUser({
      id: createdUserRow.id,
    })

    deepEqual(userRow, createdUserRow)
  })

  it("should find users by email", async () => {
    const [createdUserRow] = await createTestUsers()

    const userRows = await findUsers({
      email: createdUserRow.email,
    })

    deepEqual(size(userRows), 1)
    deepEqual(userRows, castArray(createdUserRow))
  })
})
