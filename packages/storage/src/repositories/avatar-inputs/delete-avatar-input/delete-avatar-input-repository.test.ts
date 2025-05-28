import { equal, ok, rejects } from "node:assert/strict"
import { randomUUID } from "node:crypto"
import { afterEach, describe, it } from "node:test"

import { unary } from "@ai-avatar/dash"
import { eq } from "drizzle-orm"

import { database } from "@/lib/database"
import { isDatabaseRecordNotFoundError } from "@/lib/database-errors"
import { deleteAvatarInput } from "@/repositories/avatar-inputs/delete-avatar-input/delete-avatar-input-repository"
import { avatarInput } from "@/schema/avatar-input"
import { cleanSeed } from "@/utils/scripts/seed-database"
import { createTestAvatarInputs } from "@/utils/test-utils/create-test-avatar-inputs"

describe("delete-avatar-input-repository", () => {
  afterEach(unary(cleanSeed))

  it("should delete avatar input by id", async () => {
    const [createdAvatarInputRow] =
      await createTestAvatarInputs()

    const deleteRow = await deleteAvatarInput(
      createdAvatarInputRow.id
    )

    equal(deleteRow.id, createdAvatarInputRow.id)
    ok(deleteRow.deletedAt)
  })

  it("should throw an error when avatar input does not exist", async () => {
    const nonExistentId = randomUUID()

    await rejects(
      deleteAvatarInput(nonExistentId),
      isDatabaseRecordNotFoundError
    )
  })

  it("should throw an error when avatar input is already deleted", async () => {
    const [createdAvatarInputRow] =
      await createTestAvatarInputs()

    await deleteAvatarInput(
      createdAvatarInputRow.id
    )

    await rejects(
      deleteAvatarInput(createdAvatarInputRow.id),
      isDatabaseRecordNotFoundError
    )
  })
})
