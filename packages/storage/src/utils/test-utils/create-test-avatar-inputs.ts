import {
  guard,
  map,
  required,
  sample,
  when,
} from "@ai-avatar/dash"

import { database } from "@/lib/database"
import { avatarInput } from "@/schema/avatar-input"
import { user } from "@/schema/user"
import {
  isAlreadySeedError,
  seedDatabase,
} from "@/utils/scripts/seed-database"
import { createTestUsers } from "@/utils/test-utils/create-test-users"

export const createTestAvatarInputs = async (
  override?: (typeof avatarInput.$inferInsert)[]
) => {
  await when(
    override,
    async (override) => {
      const userRowIds = map(await createTestUsers(), "id")

      const inputs = map(override, (input) => ({
        ...input,
        userId:
          input.userId ?? required(sample(userRowIds)),
      }))

      await database
        .insert(avatarInput)
        .values(inputs)
        .returning()
    },
    async () => {
      await guard(
        () =>
          seedDatabase({
            schemaOverride: {
              avatarInput,
              user,
            },
          }),
        isAlreadySeedError
      )
    }
  )

  return database.query.avatarInput.findMany({
    with: {
      avatarPersonas: true,
      user: true,
    },
  })
}
