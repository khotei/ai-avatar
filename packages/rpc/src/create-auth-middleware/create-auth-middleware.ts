import { required } from "@ai-avatar/dash"
import { initTRPC, TRPCError } from "@trpc/server"

type CreateAuthMiddlewareOptions<T> = {
  extractAuth: (
    token: string
  ) => Promise<null | T | undefined>
}

export const createAuthMiddleware = <T>(
  options: CreateAuthMiddlewareOptions<T>
) => {
  const trpc = initTRPC
    .context<{
      token?: string
    }>()
    .create()

  return {
    authProcedure: trpc.procedure.use(
      async ({ ctx, next }) => {
        const token = required(
          ctx.token,
          new TRPCError({
            code: "UNAUTHORIZED",
            message: "Authentication required",
          })
        )

        const user = required(
          await options.extractAuth(token),
          new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid authentication token",
          })
        )

        return next({
          ctx: {
            ...ctx,
            user,
          },
        })
      }
    ),
  }
}
