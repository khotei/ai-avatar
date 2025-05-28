import { partialDeepStrictEqual } from "node:assert/strict"
import { afterEach, describe, it } from "node:test"

import { first, required, unary } from "@ai-avatar/dash"

import { createUser } from "@/repositories/users/create-user/create-user-repository"
import { cleanSeed } from "@/utils/scripts/seed-database"
import { userTestInputs } from "@/utils/test-inputs/user-test-inputs"

describe("create-user-repository", () => {
  afterEach(unary(cleanSeed))

  it("should create user", async () => {
    const input = required(first(userTestInputs))

    const user = await createUser(input)

    partialDeepStrictEqual(user, input)
  })
})
