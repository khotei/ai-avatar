import { relations } from "drizzle-orm"
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

import { avatarInput } from "./avatar-input"
import { user } from "./user"

export const avatarPersona = pgTable("avatar_personas", {
  adaptationRules: text().array().notNull(),

  age: integer().notNull(),
  archetype: varchar({ length: 100 }).notNull(),
  avatarImageUrl: text().notNull(),
  avatarInputId: uuid()
    .references(() => avatarInput.id)
    .notNull(),
  catchphrases: text().array().notNull(),

  contentThemes: text().array().notNull(),
  contentTypes: text().array().notNull(),
  coreValues: text().array().notNull(),
  createdAt: timestamp().defaultNow().notNull(),

  definingMoments: text().array().notNull(),
  deletedAt: timestamp(),
  drives: text().array().notNull(),
  engagementLevel: varchar({ length: 50 }).notNull(),
  eyeColor: varchar({ length: 50 }).notNull(),
  fashionStyle: varchar({ length: 100 }).notNull(),
  fears: text().array().notNull(),
  gender: varchar({ length: 50 }).notNull(),

  goals: text(),
  hairColor: varchar({ length: 50 }),
  humorStyle: text(),

  id: uuid().primaryKey().defaultRandom(),
  languageStyle: text(),
  mediaPreferences: text().array(),
  moodProfile: text(),
  name: varchar({ length: 100 }),

  nationality: varchar({ length: 100 }),
  onlineBehaviorTraits: text().array(),
  origin: text(),
  postingFrequency: varchar({ length: 100 }),

  preferredPlatforms: text().array(),
  responsePatterns: text().array(),
  speechStyle: text(),

  struggles: text(),
  timezone: varchar({ length: 50 }),
  updatedAt: timestamp().defaultNow().notNull(),

  userId: uuid()
    .references(() => user.id)
    .notNull(),
  visualSignature: text().array(),
})

export const avatarPersonaRelations = relations(
  avatarPersona,
  ({ one }) => ({
    avatarInput: one(avatarInput, {
      fields: [avatarPersona.avatarInputId],
      references: [avatarInput.id],
    }),
    user: one(user, {
      fields: [avatarPersona.userId],
      references: [user.id],
    }),
  })
)
