import {
  partialDeepStrictEqual,
  rejects,
} from "assert/strict"
import {
  after,
  afterEach,
  before,
  describe,
  it,
} from "node:test"

import { isInstanceOf } from "@ai-avatar/dash"
import { cleanSeed } from "@ai-avatar/storage"
import { TRPCClientError } from "@trpc/client"
import { eq, unary } from "lodash"

import { startTrpc } from "@/trpc/lib/start-trpc"
import { trpcClient } from "@/trpc/lib/trpc-client"

let server: ReturnType<typeof startTrpc>

const isUserAlreadyExistTRPCError = (error: unknown) =>
  isInstanceOf(error, TRPCClientError) &&
  eq(error.data.code, "BAD_REQUEST") &&
  eq(/user already exists/iu.test(error.message), true)

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

describe("register", () => {
  it("should register and return user", async () => {
    const input = { email: "test@email.com" }
    const response = await trpcClient.register.mutate(input)

    partialDeepStrictEqual(response, input)
  })

  it("should throw error when user already exists", async () => {
    const input = { email: "test@email.com" }
    await trpcClient.register.mutate(input)

    await rejects(
      trpcClient.register.mutate(input),
      isUserAlreadyExistTRPCError
    )
  })
})
