import { ok } from "node:assert/strict"

export const required = <T>(
  val: null | T | undefined,
  err: Error | string = "Value required"
) => {
  ok(val, err instanceof Error ? err : new Error(err))

  return val
}

export const when = <T, R, F>(
  value: null | T | undefined,
  onDefined: (value: T) => R,
  onNil?: () => F
) => (value ? onDefined(value) : onNil?.())

export const isInstanceOf = <T>(
  value: unknown,
  constructor: new (...args: any[]) => T
): value is T =>
  typeof constructor === "function" &&
  value instanceof constructor

export type GuardReturnType<TFunction extends () => any> =
  TFunction extends () => Promise<infer TResolved>
    ? Promise<TResolved | undefined>
    : ReturnType<TFunction> | undefined

export const guard = <TFunction extends () => any>(
  func: TFunction,
  shouldGuard?: (err: any) => boolean
): GuardReturnType<TFunction> => {
  const onError = (err: any): any => {
    if (shouldGuard && !shouldGuard(err)) {
      throw err
    }
  }
  try {
    const result = func()
    return result instanceof Promise
      ? (result.catch(onError) as any)
      : result
  } catch (err) {
    return onError(err)
  }
}
