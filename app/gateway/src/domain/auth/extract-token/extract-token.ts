import type { IncomingMessage } from "http"

import { last, split } from "@ai-avatar/dash"

export const extractToken = (req: IncomingMessage) => {
  return req.headers.authorization
    ? last(split(req.headers.authorization, " "))
    : undefined
}
