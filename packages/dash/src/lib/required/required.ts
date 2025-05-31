import { ok } from "node:assert/strict"

export const required = <T>(
  val: null | T | undefined,
  err: Error | string = "Value required"
) => {
  ok(val, err instanceof Error ? err : new Error(err))

  return val
}
