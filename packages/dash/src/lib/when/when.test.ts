import { equal } from "node:assert/strict"
import { describe, it } from "node:test"

import { when } from "./when.js"

const createMock = (): any => {
  const mockFunction = function mockFunction(
    ...args: any[]
  ) {
    mockFunction.calls.push(args)
    return mockFunction.returnValue
  }
  mockFunction.calls = [] as any[][]
  mockFunction.returnValue = undefined
  mockFunction.mockReturnValue = function mockReturnValue(
    value: any
  ) {
    mockFunction.returnValue = value
    return mockFunction
  }
  mockFunction.mockReset = function mockReset() {
    mockFunction.calls = []
    return mockFunction
  }
  return mockFunction
}

describe("when", () => {
  it("should call onDefined with the value if it is not null or undefined", () => {
    const onDefined = createMock()
    when("test", onDefined)
    equal(onDefined.calls.length, 1)
    equal(onDefined.calls[0][0], "test")
  })

  it("should return the result of onDefined if the value is not null or undefined", () => {
    const result = when("test", (value) =>
      value.toUpperCase()
    )
    equal(result, "TEST")
  })

  it("should call onNil if the value is null or undefined", () => {
    const onNil = createMock()
    when(null, () => undefined, onNil)
    equal(onNil.calls.length, 1)

    onNil.mockReset()
    when(undefined, () => undefined, onNil)
    equal(onNil.calls.length, 1)
  })

  it("should return the result of onNil if the value is null or undefined", () => {
    const result = when(
      null,
      () => "defined",
      () => "nil"
    )
    equal(result, "nil")
  })

  it("should return undefined if the value is null or undefined and onNil is not provided", () => {
    const result = when(null, () => "defined")
    equal(result, undefined)
  })
})
