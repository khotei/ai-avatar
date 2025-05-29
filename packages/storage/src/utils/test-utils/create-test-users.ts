import { guard, when } from "@ai-avatar/dash"

import { database } from "@/lib/database"
import { user } from "@/schema/user"
import {
  isAlreadySeedError,
  seedDatabase,
} from "@/utils/scripts/seed-database"

export const createTestUsers = async (
  override?: (typeof user.$inferInsert)[]
) => {
  await when(
    override,
    async (override) => {
      await database
        .insert(user)
        .values(override)
        .returning()
    },
    async () => {
      await guard(
        () => seedDatabase({ schemaOverride: { user } }),
        isAlreadySeedError
      )
    }
  )

  return database.query.user.findMany()
}
