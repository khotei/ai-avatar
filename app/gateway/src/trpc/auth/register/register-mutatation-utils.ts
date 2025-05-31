import { TRPCError } from "@trpc/server"

export const isUserAlreadyExistError = (
  error: unknown,
  onSuccess: (error: Error) => never | void,
  onFailure: (error: unknown) => never | void
) =>
  error instanceof Error &&
  error.message.includes("already exists")
    ? onSuccess(error)
    : onFailure(error)

export const throwUserAlreadyExistError = (
  error: Error
) => {
  throw new TRPCError({
    cause: error,
    code: "BAD_REQUEST",
    message: error.message,
  })
}

export const throwUnknownError = (error: unknown) => {
  throw error
}
