import type { IncomingMessage } from "http"

import { type RequireAtLeastOne } from "@ai-avatar/dash"
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone"

type CreateContextOptions = {
  extractToken: (req: IncomingMessage) => string | undefined
}

export const createContext =
  ({
    extractToken,
  }: RequireAtLeastOne<CreateContextOptions>) =>
  ({ req }: CreateHTTPContextOptions) => {
    return {
      token: extractToken?.(req),
    }
  }
