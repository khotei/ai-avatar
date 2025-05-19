import { createHTTPServer } from "@trpc/server/adapters/standalone"

import { appRouter } from "@/trpc/lib/trpc-router"

export const server = createHTTPServer({
  router: appRouter,
})

export const startTrpc = () => {
  server.listen(9000)
}
