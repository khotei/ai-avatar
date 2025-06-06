import {
  createRPCClient,
  type CreateRpcClientOptions,
} from "@ai-avatar/rpc"

import type { routes } from "@/server/routes"

export const createClient = ({
  token,
  url,
}: Partial<CreateRpcClientOptions> = {}) =>
  createRPCClient<typeof routes>({
    token,
    url: url ?? "http://localhost:9000",
  })
