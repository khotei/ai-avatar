import {
  eq,
  partial,
  returnIdentical,
  when,
} from "@ai-avatar/dash"
import { isInstanceOf } from "@ai-avatar/dash/dist/lib/is-instance-of/is-instance-of"
import { TRPCClientError } from "@trpc/client"
import { TRPCError } from "@trpc/server"
import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc"

export const isMatchTRPCError = (
  error: unknown,
  regExp: RegExp,
  code?: TRPC_ERROR_CODE_KEY
) =>
  ((isInstanceOf(error, TRPCClientError) &&
    when(
      code,
      partial(eq, error.data.code),
      returnIdentical(true)
    )) ||
    (isInstanceOf(error, TRPCError) &&
      when(
        code,
        partial(eq, error.code),
        returnIdentical(true)
      ))) &&
  eq(regExp.test(error.message), true)
