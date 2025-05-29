import { partialDeepStrictEqual } from "node:assert/strict"
import { afterEach, describe, it } from "node:test"

import {
  first,
  merge,
  omit,
  required,
  unary,
} from "@ai-avatar/dash"

import { createAvatarPersona } from "@/repositories/avatar-personas/create-avatar-persona/create-avatar-persona-repository"
import { cleanSeed } from "@/utils/scripts/seed-database"
import { avatarPersonaTestInputs } from "@/utils/test-inputs/avatar-persona-test-inputs"
import { createTestAvatarInputs } from "@/utils/test-utils/create-test-avatar-inputs"

describe("create-avatar-persona-repository", () => {
  afterEach(unary(cleanSeed))

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

    partialDeepStrictEqual(avatarPersonaRow, {
      avatarInput: omit<
        typeof avatarInputRow,
        keyof typeof avatarInputRow
      >(avatarInputRow, ["avatarPersonas", "user"]),
      user: avatarInputRow.user,
      ...personaInput,
    })
  })
})
