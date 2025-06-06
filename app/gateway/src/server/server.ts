import { createRPCServer } from "@ai-avatar/rpc"

import { createAuthContext } from "@/server/auth/create-auth-context/create-auth-context"
import { extractToken } from "@/server/auth/extract-token/extract-token"
import { routes } from "@/server/routes"

export const server = createRPCServer({
  createContext: createAuthContext({ extractToken }),
  router: routes,
})
