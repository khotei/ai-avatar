import { describe, it } from "node:test"
import { strictEqual, throws, doesNotThrow } from "node:assert/strict"
import { throwWhenError } from "./throw-when-error.js"

describe("throwWhenError", () => {
  it("should do nothing if the error is not an instance of Error", () => {
    doesNotThrow(() => throwWhenError(null, () => {}))
    doesNotThrow(() => throwWhenError(undefined, () => {}))
    doesNotThrow(() => throwWhenError("not an error", () => {}))
  })

  it("should throw the error returned by whenSpecific if it is an instance of Error", () => {
    const returnedError = new Error("returned error")
    const error = new Error("error")
    throws(
      () => throwWhenError(error, () => returnedError),
      (err: Error) => err === returnedError
    )
  })

  // @todo: add tests
})