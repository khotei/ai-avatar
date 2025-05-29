import { describe, it } from "node:test"
import { strictEqual, throws, rejects } from "node:assert/strict"
import { guard } from "./guard.js"

describe("guard", () => {
  it("should return the result of the function if it does not throw", () => {
    const result = guard(() => "result")
    strictEqual(result, "result")
  })

  it("should return undefined if the function throws and no shouldGuard is provided", () => {
    const result = guard(() => {
      throw new Error("error")
    })
    strictEqual(result, undefined)
  })

  it("should return undefined if the function throws and shouldGuard returns true", () => {
    const result = guard(
      () => {
        throw new Error("error")
      },
      () => true
    )
    strictEqual(result, undefined)
  })

  it("should rethrow the error if the function throws and shouldGuard returns false", () => {
    const error = new Error("error")
    throws(
      () => guard(
        () => {
          throw error
        },
        () => false
      ),
      (err: Error) => err === error
    )
  })

  it("should handle async functions", async () => {
    const result = await guard(async () => "result")
    strictEqual(result, "result")
  })

  it("should handle async functions that throw", async () => {
    const result = await guard(async () => {
      throw new Error("error")
    })
    strictEqual(result, undefined)
  })

  it("should rethrow the error if the async function throws and shouldGuard returns false", async () => {
    const error = new Error("error")
    await rejects(
      guard(
        async () => {
          throw error
        },
        () => false
      ),
      (err: Error) => err === error
    )
  })
})