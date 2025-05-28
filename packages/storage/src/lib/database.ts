import { drizzle } from "drizzle-orm/neon-http"

import { getDatabaseUrl } from "@/lib/database-config"
import * as schema from "@/schema"

export const database = drizzle(getDatabaseUrl(), {
  casing: "snake_case",
  schema,
})
