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

describe("register", () => {
  it("should register and return user", async () => {
    const input = { email: "test@email.com" }
    const response =
      await createRPCClient().register.mutate(input)

    partialDeepStrictEqual(response.user, input)
    ok(response.token)
  })

  it("should throw error when user already exists", async () => {
    const input = { email: "test@email.com" }
    await createRPCClient().register.mutate(input)

    await rejects(
      createRPCClient().register.mutate(input),
      partialRight(
        isMatchTRPCError,
        /user already exists/iu
      ),
      "Should return user already exists error"
    )
  })
})
