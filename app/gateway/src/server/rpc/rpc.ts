import { required } from "@ai-avatar/dash"
import {
  createAuthMiddleware,
  createRPC,
} from "@ai-avatar/rpc"
import { findUser } from "@ai-avatar/storage"

import type { AuthContext } from "@/server/auth/create-auth-context/create-auth-context"

export const { procedure, router } =
  createRPC<AuthContext>()

const authMiddleware = createAuthMiddleware({
  extractAuth: async (id) =>
    required(await findUser({ id })),
})

export const protectedProcedure = procedure.concat(
  authMiddleware.authProcedure
)
