import { ok } from "node:assert/strict"

export const required = <T>(
  val: null | T | undefined,
  msg = "Value required"
) => {
  ok(val, new Error(msg))

  return val
}

export const when = <T, R, F>(
  value: null | T | undefined,
  onDefined: (value: T) => R,
  onNil?: () => F
) => (value ? onDefined(value) : onNil?.())
