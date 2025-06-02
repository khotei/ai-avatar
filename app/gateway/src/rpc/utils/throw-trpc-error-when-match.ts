import { TRPCError } from "@trpc/server"
import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc"

export const throwTRPCErrorWhenMatch = (
  error: Error,
  regExp: RegExp,
  code?: TRPC_ERROR_CODE_KEY
) => {
  if (regExp.test(error.message)) {
    throw new TRPCError({
      cause: error,
      code: code ?? "BAD_REQUEST",
      message: error.message,
    })
  }
}
