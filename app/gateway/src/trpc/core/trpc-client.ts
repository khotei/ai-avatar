import {
  createTRPCClient,
  httpBatchLink,
} from "@trpc/client"

import type { AppRouter } from "@/index"

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:9000",
    }),
  ],
})
