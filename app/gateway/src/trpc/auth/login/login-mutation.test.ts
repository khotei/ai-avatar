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

import { startTrpc } from "@/trpc/core/start-trpc"
import { trpcClient } from "@/trpc/core/trpc-client"
import { isMatchTRPCError } from "@/trpc/lib/is-match-trpc-error"

let server: ReturnType<typeof startTrpc>

before(async () => {
  await new Promise((resolve) => {
    server = startTrpc()
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

describe("login", () => {
  it("should login and return user", async () => {
    const input = { email: "test@email.com" }
    const { user } = await trpcClient.register.mutate(input)

    const response = await trpcClient.login.mutate({
      email: user.email,
    })

    partialDeepStrictEqual(response.user, input)
    ok(response.token)
  })

  it("should throw error when user not exists", async () => {
    const input = { email: "test@email.com" }

    await rejects(
      trpcClient.login.mutate(input),
      partialRight(isMatchTRPCError, /user not found/iu),
      "Should return user not found error"
    )
  })
})
