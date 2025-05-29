import { ok } from "node:assert/strict"
import path from "node:path"

import { getEnvConfig } from "@ai-avatar/env-config"
import { defineConfig } from "drizzle-kit"

export const getDatabaseUrl = () => {
  const { DATABASE_URL } = getEnvConfig()

  ok(DATABASE_URL, "DATABASE_URL is defined")

  return DATABASE_URL
}

export const databaseConfig = defineConfig({
  casing: "snake_case",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
  dialect: "postgresql",
  out: path.join(__dirname, "../migrations"),
  schema: path.join(__dirname, "../schema"),
})

export default databaseConfig
