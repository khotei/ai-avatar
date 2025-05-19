import { drizzle } from "drizzle-orm/neon-http"

import { getDatabaseUrl } from "@/lib/database-config"

export const database = drizzle(getDatabaseUrl(), {
  casing: "snake_case",
})
