import { required, when } from "@ai-avatar/dash"
import { seed } from "drizzle-seed"

import { database } from "@/lib/database"
import { user } from "@/schema/user"

export const createTestUsers = async (
  override?: (typeof user.$inferInsert)[]
) => {
  return required(
    await when(
      override,
      async (override) => {
        await database
          .insert(user)
          .values(override)
          .returning()

        return database.select().from(user)
      },
      async () => {
        await seed(database, { user })
        return database.select().from(user)
      }
    )
  )
}
