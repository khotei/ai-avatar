import { isInstanceOf } from "../is-instance-of/is-instance-of.js"

type SpecificHandler = (
  error: Error
) => Error | undefined | void
type AnyOtherHandler = (error: Error) => never

export const throwWhenError: {
  (
    error: unknown,
    whenSpecific: (error: Error) => Error | never
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
