import { equal } from "node:assert/strict"
import { describe, it } from "node:test"

import { tryit } from "./tryit"

describe("tryit", () => {
  it("should return [undefined, result] if the function does not throw", () => {
    const [err, result] = tryit(() => "result")()
    equal(err, undefined)
    equal(result, "result")
  })

  it("should return [error, undefined] if the function throws", async () => {
    const error = new Error("error")
    const [err, result] = await tryit(async () => {
      throw error
    })()
    equal(err, error)
    equal(result, undefined)
  })

  it("should pass arguments to the function", () => {
    const [, result] = tryit(
      (num1: number, num2: number) => num1 + num2
    )(1, 2)
    equal(result, 3)
  })

  it("should handle async functions", async () => {
    const [err, result] = await tryit(
      async () => "result"
    )()
    equal(err, undefined)
    equal(result, "result")
  })

  it("should handle async functions that throw", async () => {
    const error = new Error("error")
    const [err, result] = await tryit(async () => {
      throw error
    })()
    equal(err, error)
    equal(result, undefined)
  })

  it("should handle async functions with arguments", async () => {
    const [, result] = await tryit(
      async (num1: number, num2: number) => num1 + num2
    )(1, 2)
    equal(result, 3)
  })
})
