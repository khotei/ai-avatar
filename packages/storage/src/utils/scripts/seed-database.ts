import {
  isEqual,
  isInstanceOf,
  unary,
  when,
} from "@ai-avatar/dash"
import { NeonDbError } from "@neondatabase/serverless"
import type { PgSchema, PgTable } from "drizzle-orm/pg-core"
import { reset, seed } from "drizzle-seed"

import { database } from "@/lib/database"
import * as schema from "@/schema"

export const cleanSeed = async () => {
  await reset(database, schema)
}

export const seedDatabase = async ({
  clean = true,
  count,
  schemaOverride,
}: {
  clean?: boolean
  count?: number
  schemaOverride?: Record<string, PgSchema | PgTable>
} = {}) => {
  await when(clean, unary(cleanSeed))

  await seed(database, schemaOverride ?? schema, {
    count: count ?? 100,
  }).refine((generator) => ({
    avatarInput: {
      columns: {
        deletedAt: generator.default({
          defaultValue: null,
        }),
      },
    },
    avatarPersona: {
      columns: {
        deletedAt: generator.default({
          defaultValue: null,
        }),
      },
    },
    user: {
      columns: {
        deletedAt: generator.default({
          defaultValue: null,
        }),
      },
    },
  }))
}

export const isAlreadySeedError = (err: unknown) =>
  isInstanceOf(err, NeonDbError) &&
  isEqual(err.code, "23505")
