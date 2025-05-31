import { describe, it } from "node:test"
import { strictEqual, ok } from "node:assert/strict"
import { when } from "./when.js"

// Custom mock function implementation
function createMock() {
  const mock = function(...args: any[]) {
    mock.calls.push(args)
    return mock.returnValue
  }
  mock.calls = [] as any[][]
  mock.returnValue = undefined
  mock.mockReturnValue = function(value: any) {
    mock.returnValue = value
    return mock
  }
  mock.mockReset = function() {
    mock.calls = []
    return mock
  }
  return mock
}

describe("when", () => {
  it("should call onDefined with the value if it is not null or undefined", () => {
    const onDefined = createMock()
    when("test", onDefined)
    strictEqual(onDefined.calls.length, 1)
    strictEqual(onDefined.calls[0][0], "test")
  })

  it("should return the result of onDefined if the value is not null or undefined", () => {
    const result = when("test", (value) => value.toUpperCase())
    strictEqual(result, "TEST")
  })

  it("should call onNil if the value is null or undefined", () => {
    const onNil = createMock()
    when(null, () => {}, onNil)
    strictEqual(onNil.calls.length, 1)

    onNil.mockReset()
    when(undefined, () => {}, onNil)
    strictEqual(onNil.calls.length, 1)
  })

  it("should return the result of onNil if the value is null or undefined", () => {
    const result = when(null, () => "defined", () => "nil")
    strictEqual(result, "nil")
  })

  it("should return undefined if the value is null or undefined and onNil is not provided", () => {
    const result = when(null, () => "defined")
    strictEqual(result, undefined)
  })
})