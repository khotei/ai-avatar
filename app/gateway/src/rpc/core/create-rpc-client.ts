import { merge } from "@ai-avatar/dash"
import {
  createTRPCClient,
  httpBatchLink,
} from "@trpc/client"

import type { AppRouter } from "@/index"

export const createRPCClient = ({
  token,
}: { token?: string } = {}) =>
  createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        headers: merge(
          {},
          token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}
        ),
        url: "http://localhost:9000",
      }),
    ],
  })
