import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

import { user } from "./user"

export const avatarInput = pgTable("avatar_inputs", {
  age: integer().notNull(),

  appearanceDescription: text(),
  autoGenerateBackstory: boolean(),
  autoGeneratePosts: boolean(),
  catchphrases: text().array(),

  contentTypes: text().array(),
  createdAt: timestamp().defaultNow(),
  deletedAt: timestamp(),
  engagementLevel: varchar({ length: 50 }),

  gender: varchar({ length: 50 }).notNull(),
  goals: text(),
  hashtagStrategy: varchar({ length: 50 }),
  humorStyle: text(),
  id: uuid().primaryKey().defaultRandom(),
  interests: text().array(),
  name: varchar({ length: 100 }).notNull(),

  nationality: varchar({ length: 100 }),
  personalityType: varchar({ length: 50 }),
  postingFrequency: varchar({ length: 100 }),
  preferredContentThemes: text().array(),
  preferredPlatforms: text().array(),

  professionalSkills: text().array(),
  speechStyle: text(),
  updatedAt: timestamp().defaultNow().notNull(),

  userId: uuid()
    .references(() => user.id)
    .notNull(),
})
