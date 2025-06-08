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
  findAvatarInput,
  findAvatarInputs,
} from "@/repositories/avatar-inputs/find-avatar-inputs/find-avatar-inputs-repository"
import { cleanSeed } from "@/utils/scripts/seed-database"
import { createTestAvatarInputs } from "@/utils/test-utils/create-test-avatar-inputs"

describe("find-avatar-inputs-repository", () => {
  afterEach(unary(cleanSeed))

  it("should find avatar input by id", async () => {
    const [createdAvatarInputRow] =
      await createTestAvatarInputs()

    const avatarInputRow = await findAvatarInput(
      createdAvatarInputRow.id
    )

    deepEqual(avatarInputRow, createdAvatarInputRow)
  })

  it("should find avatars input by user id", async () => {
    const createdAvatarInputRows =
      await createTestAvatarInputs()

    const { userId } = required(
      sample(createdAvatarInputRows)
    )
    const [createdAvatarInputRowsByUserId] = partition(
      createdAvatarInputRows,
      ["userId", userId]
    )

    const avatarInputRows = await findAvatarInputs({
      userId,
    })

    equal(
      size(avatarInputRows),
      size(createdAvatarInputRowsByUserId)
    )

    map(avatarInputRows, (row) => {
      ok(
        includes(
          map(createdAvatarInputRowsByUserId, "id"),
          row.id
        )
      )
      deepEqual(row.userId, userId)
    })
  })
})
