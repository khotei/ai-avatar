import { deepEqual } from "node:assert/strict"
import { after, beforeEach, describe, it } from "node:test"

import {
  ary,
  first,
  merge,
  pick,
  required,
} from "@ai-avatar/dash"

import { createAvatarPersona } from "@/repositories/avatar-personas/create-avatar-persona/create-avatar-persona-repository"
import {
  cleanDatabase,
  seedDatabase,
} from "@/utils/scripts/seed-database"
import { avatarPersonaTestInputs } from "@/utils/test-inputs/avatar-persona-test-inputs"
import { createTestAvatarInputs } from "@/utils/test-utils/create-test-avatar-inputs"

describe("create-avatar-persona-repository", () => {
  beforeEach(ary(seedDatabase, 0))
  after(ary(cleanDatabase, 0))

  it("should create avatar persona", async () => {
    const [avatarInputRow] = await createTestAvatarInputs()

    const personaInput = merge(
      {
        avatarInputId: avatarInputRow.id,
        userId: avatarInputRow.userId,
      },
      required(first(avatarPersonaTestInputs))
    )

    const avatarPersonaRow =
      await createAvatarPersona(personaInput)

    deepEqual(avatarPersonaRow, {
      ...pick(avatarPersonaRow, [
        "createdAt",
        "id",
        "avatarInputId",
        "deletedAt",
        "updatedAt",
      ]),
      updatedAt: avatarPersonaRow.updatedAt,
      ...personaInput,
    })
  })
})
