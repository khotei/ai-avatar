import type { IncomingMessage } from "http"
import { equal } from "node:assert/strict"
import { describe, it } from "node:test"

import { extractToken } from "./extract-token"

describe("extractToken", () => {
  it("should extract token when authorization header is present", () => {
    const req = {
      headers: {
        authorization: "Bearer token123",
      },
    } as IncomingMessage

    const token = extractToken(req)

    equal(
      token,
      "token123",
      "Should extract the token part after 'Bearer '"
    )
  })

  it("should return undefined when authorization header is not present", () => {
    const req = {
      headers: {},
    } as IncomingMessage

    const token = extractToken(req)

    equal(
      token,
      undefined,
      "Should return undefined when no authorization header"
    )
  })

  it("should handle authorization header with no space", () => {
    const req = {
      headers: {
        authorization: "Bearertoken123",
      },
    } as IncomingMessage

    const token = extractToken(req)

    equal(
      token,
      "Bearertoken123",
      "Should return the entire string when no space is present"
    )
  })

  it("should handle authorization header with multiple spaces", () => {
    const req = {
      headers: {
        authorization: "Bearer token with spaces",
      },
    } as IncomingMessage

    const token = extractToken(req)

    equal(
      token,
      "spaces",
      "Should return the last part after splitting by spaces"
    )
  })
})
