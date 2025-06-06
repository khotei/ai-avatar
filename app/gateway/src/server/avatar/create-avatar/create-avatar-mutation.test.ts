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

describe("createAvatar", () => {
  it("should create avatar when user is authenticated", async () => {
    const registerInput = { email: "test@email.com" }
    const { token, user } =
      await createClient().register.mutate(registerInput)

    const avatarInput = {
      age: 25,
      gender: "male",
      name: "Test Avatar",
    }

    const response = await createClient({
      token,
    }).createAvatar.mutate(avatarInput)

    ok(response.avatar)
    partialDeepStrictEqual(response.avatar, {
      ...avatarInput,
      user,
      userId: user.id,
    })
  })

  it("should throw error when user is not authenticated", async () => {
    const avatarInput = {
      age: 25,
      gender: "male",
      name: "Test Avatar",
    }

    await rejects(
      createClient().createAvatar.mutate(avatarInput),
      partialRight(
        isMatchTRPCError,
        /authentication required/iu
      ),
      "Should return authentication required error"
    )
  })
})
