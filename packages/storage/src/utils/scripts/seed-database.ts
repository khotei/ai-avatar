import { ary, when } from "@ai-avatar/dash"
import { reset, seed } from "drizzle-seed"

import { database } from "@/lib/database"
import { avatarInput } from "@/schema/avatar-input"
import { avatarPersona } from "@/schema/avatar-persona"
import { user } from "@/schema/user"

const schemas = {
  avatarsInput: avatarInput,
  avatarsPersona: avatarPersona,
  users: user,
}

export const cleanDatabase = async () => {
  await reset(database, schemas)
}

export const seedDatabase = async (
  count?: number,
  clean = true
) => {
  when(clean, ary(cleanDatabase, 0))

  await seed(database, schemas, {
    count: count ?? 100,
  })
}
