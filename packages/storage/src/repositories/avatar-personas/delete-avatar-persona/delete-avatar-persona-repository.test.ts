import { equal, ok, rejects } from "node:assert/strict"
import { randomUUID } from "node:crypto"
import { afterEach, describe, it } from "node:test"

import { unary } from "@ai-avatar/dash"
import { eq } from "drizzle-orm"

import { database } from "@/lib/database"
import { isDatabaseRecordNotFoundError } from "@/lib/database-errors"
import { deleteAvatarPersona } from "@/repositories/avatar-personas/delete-avatar-persona/delete-avatar-persona-repository"
import { avatarPersona } from "@/schema/avatar-persona"
import { cleanSeed } from "@/utils/scripts/seed-database"
import { createTestAvatarPersonas } from "@/utils/test-utils/create-test-avatar-personas"

describe("delete-avatar-persona-repository", () => {
  afterEach(unary(cleanSeed))

  it("should delete avatar persona by id", async () => {
    const [createdAvatarPersonaRow] =
      await createTestAvatarPersonas()

    const deletedId = await deleteAvatarPersona(
      createdAvatarPersonaRow.id
    )

    equal(deletedId, createdAvatarPersonaRow.id)

    const deletedAvatarPersona =
      await database.query.avatarPersona.findFirst({
        where: eq(avatarPersona.id, deletedId),
      })

    ok(deletedAvatarPersona)
    ok(deletedAvatarPersona.deletedAt)
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

    await database
      .update(avatarPersona)
      .set({
        deletedAt: new Date(),
      })
      .where(
        eq(avatarPersona.id, createdAvatarPersonaRow.id)
      )

    await rejects(
      deleteAvatarPersona(createdAvatarPersonaRow.id),
      isDatabaseRecordNotFoundError
    )
  })
})
