import type { IncomingMessage } from "http"

import { type RequireAtLeastOne } from "@ai-avatar/dash"

type CreateContextOptions = {
  extractToken: (req: IncomingMessage) => string | undefined
}

export type AuthContext = {
  token?: string
}

export const createAuthContext =
  ({
    extractToken,
  }: RequireAtLeastOne<CreateContextOptions>) =>
  ({ req }: { req: IncomingMessage }) => {
    return {
      token: extractToken(req),
    }
  }
