export type Ok<TResult> = [err: undefined, result: TResult]
export type Err<TError extends Error = Error> = [
  err: TError,
  result: undefined,
]

export type Tryit<TResult, TError extends Error = Error> =
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
      : Tryit<TResult, TError>
>

export type TryitResult<
  TReturn,
  TError extends Error = Error,
> =
  TReturn extends PromiseLike<infer TResult>
    ? ResultPromise<TResult, TError>
    : Tryit<TReturn, TError>

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