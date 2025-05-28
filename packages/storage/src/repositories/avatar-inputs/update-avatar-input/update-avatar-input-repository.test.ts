import {
  deepEqual,
  equal,
  ok,
  partialDeepStrictEqual,
} from "node:assert/strict"
import { afterEach, describe, it } from "node:test"

import {
  gt,
  required,
  sample,
  unary,
} from "@ai-avatar/dash"

import { updateAvatarInput } from "@/repositories/avatar-inputs/update-avatar-input/update-avatar-input-repository"
import { cleanSeed } from "@/utils/scripts/seed-database"
import { avatarInputTestInputs } from "@/utils/test-inputs/avatar-input-test-inputs"
import { createTestAvatarInputs } from "@/utils/test-utils/create-test-avatar-inputs"

describe("update-avatar-input-repository", () => {
  afterEach(unary(cleanSeed))

  it("should update avatar input by id", async () => {
    const [createdAvatarInputRow] =
      await createTestAvatarInputs()

    const updateInput = required(
      sample(avatarInputTestInputs)
    )

    const updatedAvatarInputRow = await updateAvatarInput(
      createdAvatarInputRow.id,
      updateInput
    )

    partialDeepStrictEqual(
      updatedAvatarInputRow,
      updateInput
    )
    ok(
      gt(
        updatedAvatarInputRow.updatedAt,
        createdAvatarInputRow.updatedAt
      )
    )
    equal(
      updatedAvatarInputRow.userId,
      createdAvatarInputRow.userId
    )
    equal(
      updatedAvatarInputRow.id,
      createdAvatarInputRow.id
    )
    deepEqual(
      updatedAvatarInputRow.avatarPersonas,
      createdAvatarInputRow.avatarPersonas
    )
  })
})
