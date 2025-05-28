import { deepEqual, equal, ok } from "node:assert/strict"
import { afterEach, describe, it } from "node:test"

import {
  includes,
  map,
  partition,
  required,
  sample,
  size,
  unary,
} from "@ai-avatar/dash"

import {
  findAvatarPersona,
  findAvatarPersonas,
} from "@/repositories/avatar-personas/find-avatar-personas-repository/find-avatar-personas-repository"
import { cleanSeed } from "@/utils/scripts/seed-database"
import { createTestAvatarPersonas } from "@/utils/test-utils/create-test-avatar-personas"

describe("find-avatar-personas-repository", () => {
  afterEach(unary(cleanSeed))

  it("should find avatar persona by id", async () => {
    const [createdAvatarPersonaRow] =
      await createTestAvatarPersonas()

    const avatarPersonaRow = await findAvatarPersona(
      createdAvatarPersonaRow.id
    )

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
