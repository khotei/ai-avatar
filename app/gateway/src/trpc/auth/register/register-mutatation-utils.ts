import { TRPCError } from "@trpc/server"

export const throwUserAlreadyExistError = (
  error: Error
) => {
  if (/user already exists/iu.test(error.message)) {
    throw new TRPCError({
      cause: error,
      code: "BAD_REQUEST",
      message: error.message,
    })
  }
}

export const throwError = (error: Error): never => {
  throw error
}
