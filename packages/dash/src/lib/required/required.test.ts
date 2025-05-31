import {
  deepEqual,
  equal,
  throws,
} from "node:assert/strict"
import { describe, it } from "node:test"

import { required } from "./required.js"

describe("required", () => {
  it("should return the value if it is not null or undefined", () => {
    equal(required("test"), "test")
    equal(required(123), 123)
    deepEqual(required({}), {})
  })

  it("should throw an error if the value is null or undefined", () => {
    throws(() => required(null))
    throws(() => required(undefined))
  })

  it("should throw the provided error if the value is null or undefined", () => {
    const error = new Error("Custom error")
    throws(
      () => required(null, error),
      (err: Error) => err === error
    )
  })

  it("should throw an error with the provided message if the value is null or undefined", () => {
    throws(
      () => required(null, "Custom message"),
      /Custom message/u
    )
  })
})
