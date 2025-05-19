import {
  map,
  required,
  sample,
  when,
} from "@ai-avatar/dash"
import { seed } from "drizzle-seed"

import { database } from "@/lib/database"
import { avatarInput } from "@/schema/avatar-input"
import { avatarPersona } from "@/schema/avatar-persona"
import { user } from "@/schema/user"
import { avatarInputTestInputs } from "@/utils/test-inputs/avatar-input-test-inputs"
import { createTestAvatarInputs } from "@/utils/test-utils/create-test-avatar-inputs"
import { createTestUsers } from "@/utils/test-utils/create-test-users"

export const createTestAvatarPersonas = async (
  override?: (typeof avatarPersona.$inferInsert)[]
) => {
  return required(
    await when(
      override,
      async (override) => {
        const userRowIds = map(
          await createTestUsers(),
          "id"
        )
        const avatarInputRowIds = map(
          await createTestAvatarInputs(
            map(avatarInputTestInputs, (input) => ({
              ...input,
              userId: required(sample(userRowIds)),
            }))
          ),
          "id"
        )

        const input = map(override, (input) => ({
          ...input,
          avatarInputId: required(
            sample(avatarInputRowIds)
          ),
          userId: required(sample(userRowIds)),
        }))

        await database
          .insert(avatarPersona)
          .values(input)
          .returning()

        return database.select().from(avatarPersona)
      },
      async () => {
        await seed(database, {
          avatarInput,
          avatarPersona,
          user,
        })

        return database.select().from(avatarPersona)
      }
    )
  )
}
