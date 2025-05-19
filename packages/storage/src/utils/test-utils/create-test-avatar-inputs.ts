import {
  map,
  required,
  sample,
  when,
} from "@ai-avatar/dash"
import { seed } from "drizzle-seed"

import { database } from "@/lib/database"
import { avatarInput } from "@/schema/avatar-input"
import { user } from "@/schema/user"
import { createTestUsers } from "@/utils/test-utils/create-test-users"

export const createTestAvatarInputs = async (
  override?: (typeof avatarInput.$inferInsert)[]
) => {
  return required(
    await when(
      override,
      async (override) => {
        const userRowIds = map(
          await createTestUsers(),
          "id"
        )

        const inputs = map(override, (input) => ({
          ...input,
          userId: required(sample(userRowIds)),
        }))

        await database
          .insert(avatarInput)
          .values(inputs)
          .returning()

        return database.select().from(avatarInput)
      },
      async () => {
        await seed(database, {
          avatarInput,
          user,
        })

        return database.select().from(avatarInput)
      }
    )
  )
}
