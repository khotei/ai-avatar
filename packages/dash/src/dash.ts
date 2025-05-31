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

export type Ok<TResult> = [err: undefined, result: TResult]
export type Err<TError extends Error = Error> = [
  err: TError,
  result: undefined,
]

export type Result<TResult, TError extends Error = Error> =
  | Err<TError>
  | Ok<TResult>

export type ResultPromise<
  TResult,
  TError extends Error = Error,
> = Promise<
  [TError] extends [never]
    ? Ok<TResult>
    : [TResult] extends [never]
      ? Err<TError>
      : Result<TResult, TError>
>

export type TryitResult<
  TReturn,
  TError extends Error = Error,
> =
  TReturn extends PromiseLike<infer TResult>
    ? ResultPromise<TResult, TError>
    : Result<TReturn, TError>

export const tryit =
  <
    TArgs extends any[],
    TReturn,
    TError extends Error = Error,
  >(
    func: (...args: TArgs) => TReturn
  ): ((...args: TArgs) => TryitResult<TReturn, TError>) =>
  (...args): any => {
    try {
      const result = func(...args)
      return result instanceof Promise
        ? result.then(
            (value) => [undefined, value],
            (err) => [err, undefined]
          )
        : [undefined, result]
    } catch (err) {
      return [err, undefined]
    }
  }

type SpecificHandler = (error: Error) => never | void | Error
type AnyOtherHandler = (error: Error) => never

export const throwWhenError: {
  (
    error: unknown,
    whenSpecific: (error: Error) => never | Error,
  ): asserts error is null | undefined

  (
    error: unknown,
    whenSpecific: SpecificHandler,
    whenAnyOther: AnyOtherHandler
  ): asserts error is null | undefined

  (error: unknown, whenSpecific: SpecificHandler): void
} = (
  error: unknown,
  whenSpecific: SpecificHandler,
  whenAnyOtherOrReplace?: AnyOtherHandler
) => {
  if (!(error instanceof Error)) {
    return
  }

  if (isInstanceOf(whenSpecific(error), Error)) {
    throw whenSpecific(error)
  }

  whenSpecific(error)
  whenAnyOtherOrReplace?.(error)
}
