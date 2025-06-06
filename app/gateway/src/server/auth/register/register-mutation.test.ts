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

describe("register", () => {
  it("should register and return user", async () => {
    const input = { email: "test@email.com" }
    const response =
      await createClient().register.mutate(input)

    partialDeepStrictEqual(response.user, input)
    ok(response.token)
  })

  it("should throw error when user already exists", async () => {
    const input = { email: "test@email.com" }
    await createClient().register.mutate(input)

    await rejects(
      createClient().register.mutate(input),
      partialRight(
        isMatchTRPCError,
        /user already exists/iu
      ),
      "Should return user already exists error"
    )
  })
})
