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

describe("login", () => {
  it("should login and return user", async () => {
    const input = { email: "test@email.com" }
    const { user } =
      await createClient().register.mutate(input)

    const response = await createClient().login.mutate({
      email: user.email,
    })

    partialDeepStrictEqual(response.user, input)
    ok(response.token)
  })

  it("should throw error when user not exists", async () => {
    const input = { email: "test@email.com" }

    await rejects(
      createClient().login.mutate(input),
      partialRight(isMatchTRPCError, /user not found/iu),
      "Should return user not found error"
    )
  })
})
