import { deepEqual, rejects } from "node:assert/strict"
import { describe, it } from "node:test"

import { partialRight } from "@ai-avatar/dash"

import { isMatchTRPCError } from "@/lib/is-match-trpc-error"

import { createAuthMiddleware } from "./create-auth-middleware"

const mockUser = {
  email: "test@example.com",
  id: "user-123",
}

const middlewareMock = {
  context: {
    avoidToken: {
      token: undefined,
    },
    includeToken: {
      token: "valid-token",
    },
  },

  extractAuth: {
    avoidUse: async () => null,
    includeUser: async () => mockUser,
  },
}

describe("create-auth-middleware", () => {
  it("should add user to context when token is valid", async () => {
    const { authProcedure } = createAuthMiddleware({
      extractAuth: middlewareMock.extractAuth.includeUser,
    })

    const caller = authProcedure
      .experimental_caller(({ invoke }) =>
        invoke({
          ctx: middlewareMock.context.includeToken,
          getRawInput: () => Promise.resolve(),
          input: undefined,
          path: "",
          signal: undefined,
          type: "query",
        })
      )
      .query((ctx) => ctx)
    const result = await caller()

    deepEqual(result.ctx, {
      token: middlewareMock.context.includeToken.token,
      user: mockUser,
    })
  })

  it("should throw UNAUTHORIZED error when token is missing", async () => {
    const { authProcedure } = createAuthMiddleware({
      extractAuth: middlewareMock.extractAuth.avoidUse,
    })

    const caller = authProcedure
      .experimental_caller(({ invoke }) =>
        invoke({
          ctx: {},
          getRawInput: () => Promise.resolve(),
          input: undefined,
          path: "",
          signal: undefined,
          type: "query",
        })
      )
      .query((ctx) => ctx)

    await rejects(
      caller,
      partialRight(
        isMatchTRPCError,
        /authentication required/iu,
        "UNAUTHORIZED"
      ),
      "Should throw UNAUTHORIZED error when token is missing"
    )
  })

  it("should throw UNAUTHORIZED error when user extraction fails", async () => {
    const { authProcedure } = createAuthMiddleware({
      extractAuth: middlewareMock.extractAuth.avoidUse,
    })

    const caller = authProcedure
      .experimental_caller(({ invoke }) =>
        invoke({
          ctx: middlewareMock.context.includeToken,
          getRawInput: () => Promise.resolve(),
          input: undefined,
          path: "",
          signal: undefined,
          type: "query",
        })
      )
      .query((ctx) => ctx)

    await rejects(
      caller,
      partialRight(
        isMatchTRPCError,
        /invalid authentication token/iu,
        "UNAUTHORIZED"
      ),
      "Should throw UNAUTHORIZED error when user extraction fails"
    )
  })
})
