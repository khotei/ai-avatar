import {
  eq,
  partial,
  stubTrue,
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
    when(code, partial(eq, error.data.code), stubTrue)) ||
    (isInstanceOf(error, TRPCError) &&
      when(code, partial(eq, error.code), stubTrue))) &&
  eq(regExp.test(error.message), true)
