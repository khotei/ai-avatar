import { deepEqual, equal, ok } from "node:assert/strict"
import { after, beforeEach, describe, it } from "node:test"

import {
  ary,
  includes,
  map,
  partition,
  required,
  sample,
  size,
} from "@ai-avatar/dash"

import {
  findAvatarPersona,
  findAvatarPersonas,
} from "@/repositories/avatar-personas/find-avatar-personas-repository/find-avatar-personas-repository"
import {
  cleanDatabase,
  seedDatabase,
} from "@/utils/scripts/seed-database"
import { createTestAvatarPersonas } from "@/utils/test-utils/create-test-avatar-personas"

describe("find-avatar-personas-repository", () => {
  beforeEach(ary(seedDatabase, 0))
  after(ary(cleanDatabase, 0))

  it("should find avatar persona by id", async () => {
    const [createdAvatarPersonaRow] =
      await createTestAvatarPersonas()

    const avatarPersonaRow = await findAvatarPersona({
      id: createdAvatarPersonaRow.id,
    })

    deepEqual(createdAvatarPersonaRow, avatarPersonaRow)
  })

  it("should find avatars persona by user id", async () => {
    const createdAvatarPersonaRows =
      await createTestAvatarPersonas()

    const { userId } = required(
      sample(createdAvatarPersonaRows)
    )
    const [createdAvatarPersonaRowsByUserId] = partition(
      createdAvatarPersonaRows,
      ["userId", userId]
    )

    const avatarPersonaRows = await findAvatarPersonas({
      userId,
    })

    equal(
      size(avatarPersonaRows),
      size(createdAvatarPersonaRowsByUserId)
    )

    map(avatarPersonaRows, (row) => {
      ok(
        includes(
          map(createdAvatarPersonaRowsByUserId, "id"),
          row.id
        )
      )

      deepEqual(row.userId, userId)
    })
  })
})
