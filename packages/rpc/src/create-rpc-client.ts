import { createTRPCClient, httpLink } from "@trpc/client"
import type { AnyRouter } from "@trpc/server"

export type CreateRpcClientOptions = {
  token?: string
  url: string
}

export const createRPCClient = <TRouter extends AnyRouter>({
  token,
  url,
}: CreateRpcClientOptions) =>
  createTRPCClient<TRouter>({
    links: [
      httpLink<AnyRouter>({
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
        url,
      }),
    ],
  })
