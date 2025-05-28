import { relations } from "drizzle-orm"
import {
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

import { avatarInput } from "./avatar-input"
import { avatarPersona } from "./avatar-persona"

export const user = pgTable("users", {
  createdAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),

  email: varchar({ length: 255 }).notNull().unique(),
  id: uuid().primaryKey().defaultRandom(),

  updatedAt: timestamp().defaultNow().notNull(),
})

export const userRelations = relations(
  user,
  ({ many }) => ({
    avatarInputs: many(avatarInput),
    avatarPersonas: many(avatarPersona),
  })
)
