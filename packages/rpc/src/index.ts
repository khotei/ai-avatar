export { createAuthMiddleware } from "./create-auth-middleware/create-auth-middleware"
export { createRPC } from "./create-rpc"
export {
  createRPCClient,
  type CreateRpcClientOptions,
} from "./create-rpc-client"
export { createRPCServer } from "./create-rpc-server"
export { isMatchTRPCError } from "./lib/is-match-trpc-error"
export { throwTRPCErrorWhenMatch } from "./lib/throw-trpc-error-when-match"
