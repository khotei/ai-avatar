import {
  ok,
  partialDeepStrictEqual,
  rejects,
} from "node:assert/strict"
import {
  after,
  afterEach,
  before,
  describe,
  it,
} from "node:test"

import { bind, partialRight, unary } from "@ai-avatar/dash"
import { isMatchTRPCError } from "@ai-avatar/rpc"
import { cleanSeed } from "@ai-avatar/storage"

import { createClient } from "@/server/rpc/create-client"
import { server } from "@/server/server"
import {
  closeServer,
  listenServer,
} from "@/server/start-server"

before(bind(listenServer, null, server))

after(bind(closeServer, null, server))

afterEach(unary(cleanSeed))

describe("updateAvatarInput", () => {
  it("should update avatar when user is authenticated", async () => {
    const registerInput = { email: "test@email.com" }
    const { token, user } =
      await createClient().register.mutate(registerInput)

    const avatarInput = {
      age: 25,
      gender: "male",
      interests: ["coding", "AI"],
      name: "Test Avatar",
      personalityType: "INTJ",
    }

    const createResponse = await createClient({
      token,
    }).createAvatarInput.mutate(avatarInput)

    const updateInput = {
      age: 30,
      id: createResponse.id,
      interests: ["coding", "AI", "machine learning"],
      name: "Updated Avatar",
      speechStyle: "Technical",
    }

    const updateResponse = await createClient({
      token,
    }).updateAvatarInput.mutate(updateInput)

    ok(updateResponse)
    partialDeepStrictEqual(updateResponse, {
      ...avatarInput,
      ...updateInput,
      userId: user.id,
    })
  })

  it("should throw error when user is not authenticated", async () => {
    const registerInput = { email: "test@email.com" }
    const { token } =
      await createClient().register.mutate(registerInput)

    const avatarInput = {
      age: 25,
      gender: "male",
      interests: ["coding", "AI"],
      name: "Test Avatar",
    }

    const createResponse = await createClient({
      token,
    }).createAvatarInput.mutate(avatarInput)

    const updateInput = {
      age: 30,
      id: createResponse.id,
      interests: ["coding", "AI", "machine learning"],
      name: "Updated Avatar",
    }

    await rejects(
      createClient().updateAvatarInput.mutate(updateInput),
      partialRight(
        isMatchTRPCError,
        /authentication required/iu
      ),
      "Should return authentication required error"
    )
  })

  it("should throw error when avatar input is not found", async () => {
    const registerInput = { email: "test@email.com" }
    const { token } =
      await createClient().register.mutate(registerInput)

    const updateInput = {
      id: "00000000-0000-0000-0000-000000000000",
      input: {
        age: 30,
        interests: ["coding", "AI"],
        name: "Updated Avatar",
      },
    }

    await rejects(
      createClient({ token }).updateAvatarInput.mutate(
        updateInput
      ),
      partialRight(
        isMatchTRPCError,
        /avatar input not found/iu
      ),
      "Should return avatar input not found error"
    )
  })

  it("should throw error when trying to update avatar input with wrong userId", async () => {
    const firstUserRegisterInput = {
      email: "first@email.com",
    }
    const { token: firstUserToken } =
      await createClient().register.mutate(
        firstUserRegisterInput
      )

    const firstUserAvatarInput = {
      age: 25,
      gender: "male",
      interests: ["coding", "AI"],
      name: "First User Avatar",
    }

    const firstUserCreateResponse = await createClient({
      token: firstUserToken,
    }).createAvatarInput.mutate(firstUserAvatarInput)

    const secondUserRegisterInput = {
      email: "second@email.com",
    }
    const { token: secondUserToken } =
      await createClient().register.mutate(
        secondUserRegisterInput
      )

    const updateInput = {
      age: 30,
      id: firstUserCreateResponse.id,
      interests: ["hacking"],
      name: "Attempted Update By Second User",
    }

    await rejects(
      createClient({
        token: secondUserToken,
      }).updateAvatarInput.mutate(updateInput),
      partialRight(
        isMatchTRPCError,
        /avatar input not found/iu
      ),
      "Should return avatar input not found error when trying to update with wrong userId"
    )
  })
})
