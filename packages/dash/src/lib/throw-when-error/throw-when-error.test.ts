import { doesNotThrow, throws } from "node:assert/strict"
import { describe, it } from "node:test"

import { throwWhenError } from "./throw-when-error.js"

describe("throwWhenError", () => {
  it("should do nothing if the error is not an instance of Error", () => {
    doesNotThrow(() =>
      throwWhenError(null, () => undefined)
    )
    doesNotThrow(() =>
      throwWhenError(undefined, () => undefined)
    )
    doesNotThrow(() =>
      throwWhenError("not an error", () => undefined)
    )
  })

  it("should throw the error returned by whenSpecific if it is an instance of Error", () => {
    const returnedError = new Error("returned error")
    const error = new Error("error")
    throws(
      () => throwWhenError(error, () => returnedError),
      (err: Error) => err === returnedError
    )
  })

  it("should throw by whenSpecific", () => {
    const returnedError = new Error("returned error")
    const error = new Error("error")
    throws(
      () =>
        throwWhenError(
          error,
          () => {
            throw returnedError
          },
          () => {
            throw error
          }
        ),
      (err: Error) => err === returnedError
    )
  })

  it("should throw by whenAnyOther", () => {
    const error = new Error("error")
    throws(
      () =>
        throwWhenError(
          error,
          () => undefined,
          () => {
            throw error
          }
        ),
      (err: Error) => err === error
    )
  })
})
