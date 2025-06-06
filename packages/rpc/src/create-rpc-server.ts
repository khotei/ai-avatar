import type { AnyRouter } from "@trpc/server"
import {
  type CreateHTTPHandlerOptions,
  createHTTPServer,
} from "@trpc/server/adapters/standalone"

export const createRPCServer = <TRouter extends AnyRouter>(
  opts: CreateHTTPHandlerOptions<TRouter>
) => {
  return createHTTPServer(opts)
}
