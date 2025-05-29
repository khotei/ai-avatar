import { describe, it } from "node:test"
import { strictEqual } from "node:assert/strict"
import { isInstanceOf } from "./is-instance-of.js"

describe("isInstanceOf", () => {
  it("should return true if the value is an instance of the constructor", () => {
    class TestClass {}
    const instance = new TestClass()
    strictEqual(isInstanceOf(instance, TestClass), true)
  })

  it("should return false if the value is not an instance of the constructor", () => {
    class TestClass {}
    class OtherClass {}
    const instance = new TestClass()
    strictEqual(isInstanceOf(instance, OtherClass), false)
  })

  it("should return false if the value is null or undefined", () => {
    class TestClass {}
    strictEqual(isInstanceOf(null, TestClass), false)
    strictEqual(isInstanceOf(undefined, TestClass), false)
  })

  it("should return false if the constructor is not a function", () => {
    const notAFunction = {} as any
    strictEqual(isInstanceOf({}, notAFunction), false)
  })
})