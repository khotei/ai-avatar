import { equal } from "node:assert/strict"
import { describe, it } from "node:test"

import { isInstanceOf } from "./is-instance-of.js"

describe("isInstanceOf", () => {
  it("should return true if the value is an instance of the constructor", () => {
    class TestClass {}
    const instance = new TestClass()
    equal(isInstanceOf(instance, TestClass), true)
  })

  it("should return false if the value is not an instance of the constructor", () => {
    class TestClass {}
    class OtherClass {}
    const instance = new TestClass()
    equal(isInstanceOf(instance, OtherClass), false)
  })

  it("should return false if the value is null or undefined", () => {
    class TestClass {}
    equal(isInstanceOf(null, TestClass), false)
    equal(isInstanceOf(undefined, TestClass), false)
  })

  it("should return false if the constructor is not a function", () => {
    const notAFunction = {} as any
    equal(isInstanceOf({}, notAFunction), false)
  })
})
