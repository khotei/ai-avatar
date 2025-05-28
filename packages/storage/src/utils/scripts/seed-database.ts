import {
  ary,
  isEqual,
  isInstanceOf,
  when,
} from "@ai-avatar/dash"
import { NeonDbError } from "@neondatabase/serverless"
import { reset, seed } from "drizzle-seed"

import { database } from "@/lib/database"
import { avatarInput, avatarPersona, user } from "@/schema"

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

export const isAlreadySeedError = (err: unknown) =>
  isInstanceOf(err, NeonDbError) &&
  isEqual(err.code, "23505")
