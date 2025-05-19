import {
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

export const user = pgTable("users", {
  createdAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),

  email: varchar({ length: 255 }).notNull().unique(),
  id: uuid().primaryKey().defaultRandom(),

  updatedAt: timestamp().defaultNow(),
})
