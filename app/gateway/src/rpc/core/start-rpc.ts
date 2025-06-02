import { createHTTPServer } from "@trpc/server/adapters/standalone"

import { extractToken } from "@/domain/auth/extract-token/extract-token"
import { createContext } from "@/rpc/core/create-context"
import { appRouter } from "@/rpc/core/rpc-router"

export const server = createHTTPServer({
  createContext: createContext({ extractToken }),
  router: appRouter,
})

export const startRpc = () => {
  return server.listen(9000)
}
