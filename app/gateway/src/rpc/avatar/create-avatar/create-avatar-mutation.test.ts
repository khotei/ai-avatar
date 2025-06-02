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

import { partialRight, unary } from "@ai-avatar/dash"
import { cleanSeed } from "@ai-avatar/storage"

import { createRPCClient } from "@/rpc/core/create-rpc-client"
import { startRpc } from "@/rpc/core/start-rpc"
import { isMatchTRPCError } from "@/rpc/utils/is-match-trpc-error"

let server: ReturnType<typeof startRpc>

before(async () => {
  await new Promise((resolve) => {
    server = startRpc()
    server.on("listening", resolve)
  })
})

after(async () => {
  server.close()

  await new Promise((resolve) => {
    server.on("close", resolve)
  })
})

afterEach(unary(cleanSeed))

describe("createAvatar", () => {
  it("should create avatar when user is authenticated", async () => {
    const registerInput = { email: "test@email.com" }
    const { token, user } =
      await createRPCClient().register.mutate(registerInput)

    const avatarInput = {
      age: 25,
      gender: "male",
      name: "Test Avatar",
    }

    const response = await createRPCClient({
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
      createRPCClient().createAvatar.mutate(avatarInput),
      partialRight(
        isMatchTRPCError,
        /authentication required/iu
      ),
      "Should return authentication required error"
    )
  })
})
