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

import { updateAvatarPersona } from "@/repositories/avatar-personas/update-avatar-persona/update-avatar-persona-repository"
import { cleanSeed } from "@/utils/scripts/seed-database"
import { avatarPersonaTestInputs } from "@/utils/test-inputs/avatar-persona-test-inputs"
import { createTestAvatarPersonas } from "@/utils/test-utils/create-test-avatar-personas"

describe("update-avatar-persona-repository", () => {
  afterEach(unary(cleanSeed))

  it("should update avatar persona by id", async () => {
    const [createdAvatarPersonaRow] =
      await createTestAvatarPersonas()

    const updateInput = required(
      sample(avatarPersonaTestInputs)
    )

    const updatedAvatarPersonaRow =
      await updateAvatarPersona(
        createdAvatarPersonaRow.id,
        updateInput
      )

    partialDeepStrictEqual(
      updatedAvatarPersonaRow,
      updateInput
    )
    ok(
      gt(
        updatedAvatarPersonaRow.updatedAt,
        createdAvatarPersonaRow.updatedAt
      )
    )
    equal(
      updatedAvatarPersonaRow.userId,
      createdAvatarPersonaRow.userId
    )
    equal(
      updatedAvatarPersonaRow.id,
      createdAvatarPersonaRow.id
    )
    equal(
      updatedAvatarPersonaRow.avatarInputId,
      createdAvatarPersonaRow.avatarInputId
    )
    deepEqual(
      updatedAvatarPersonaRow.avatarInput,
      createdAvatarPersonaRow.avatarInput
    )
  })
})
