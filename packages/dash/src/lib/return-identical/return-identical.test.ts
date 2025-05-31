import { deepEqual, equal } from "node:assert/strict"
import { describe, it } from "node:test"

import { returnIdentical } from "./return-identical"

describe("returnIdentical", () => {
  it("should return a function", () => {
    const result = returnIdentical("test")
    equal(typeof result, "function")
  })

  it("should return a function that returns the original primitive value", () => {
    const stringValue = "test"
    const numberValue = 123
    const booleanValue = true

    equal(returnIdentical(stringValue)(), stringValue)
    equal(returnIdentical(numberValue)(), numberValue)
    equal(returnIdentical(booleanValue)(), booleanValue)
  })

  it("should return a function that returns the original object value", () => {
    const objectValue = { key: "value" }
    const arrayValue = [1, 2, 3]
    const functionValue = () => "test"

    deepEqual(returnIdentical(objectValue)(), objectValue)
    deepEqual(returnIdentical(arrayValue)(), arrayValue)
    equal(returnIdentical(functionValue)(), functionValue)
  })

  it("should return a function that returns null or undefined if those were the original values", () => {
    equal(returnIdentical(null)(), null)
    equal(returnIdentical(undefined)(), undefined)
  })
})
