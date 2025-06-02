import { required } from "@ai-avatar/dash"
import { findUser } from "@ai-avatar/storage/dist/repositories/users/find-users/find-users-repository"
import { initTRPC } from "@trpc/server"

import { createAuthMiddleware } from "@/rpc/core/create-auth-middleware/auth-middleware"
import type { createContext } from "@/rpc/core/create-context"

export const rpc = initTRPC
  .context<ReturnType<typeof createContext>>()
  .create()

export const publicProcedure = rpc.procedure

const authMiddleware = createAuthMiddleware({
  extractAuth: async (id) =>
    required(await findUser({ id })),
})

export const protectedProcedure = publicProcedure.concat(
  authMiddleware.authProcedure
)
