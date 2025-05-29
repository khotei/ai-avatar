import { equal, ok, rejects } from "node:assert/strict"
import { randomUUID } from "node:crypto"
import { afterEach, describe, it } from "node:test"

import { unary } from "@ai-avatar/dash"

import { isDatabaseRecordNotFoundError } from "@/lib/database-errors"
import { deleteAvatarPersona } from "@/repositories/avatar-personas/delete-avatar-persona/delete-avatar-persona-repository"
import { cleanSeed } from "@/utils/scripts/seed-database"
import { createTestAvatarPersonas } from "@/utils/test-utils/create-test-avatar-personas"

describe("delete-avatar-persona-repository", () => {
  afterEach(unary(cleanSeed))

  it("should delete avatar persona by id", async () => {
    const [createdAvatarPersonaRow] =
      await createTestAvatarPersonas()

    const deletedRow = await deleteAvatarPersona(
      createdAvatarPersonaRow.id
    )

    equal(deletedRow.id, createdAvatarPersonaRow.id)
    ok(deletedRow.deletedAt)
  })

  it("should throw an error when avatar persona does not exist", async () => {
    const nonExistentId = randomUUID()

    await rejects(
      deleteAvatarPersona(nonExistentId),
      isDatabaseRecordNotFoundError
    )
  })

  it("should throw an error when avatar persona is already deleted", async () => {
    const [createdAvatarPersonaRow] =
      await createTestAvatarPersonas()

    await deleteAvatarPersona(createdAvatarPersonaRow.id)

    await rejects(
      deleteAvatarPersona(createdAvatarPersonaRow.id),
      isDatabaseRecordNotFoundError
    )
  })
})
