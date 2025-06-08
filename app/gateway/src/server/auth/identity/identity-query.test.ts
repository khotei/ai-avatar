import {
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

describe("identity", () => {
  it("should return user when token exists", async () => {
    const input = { email: "test@email.com" }
    const { token, user } =
      await createClient().register.mutate(input)

    const identityUser = await createClient({
      token,
    }).identity.query()

    partialDeepStrictEqual(user, identityUser)
  })

  it("should throw error when token does not exist", async () => {
    const client = createClient()

    await rejects(
      client.identity.query(),
      partialRight(
        isMatchTRPCError,
        /authentication required/iu,
        "UNAUTHORIZED"
      ),
      "Should return unauthorized error when token does not exist"
    )
  })
})
