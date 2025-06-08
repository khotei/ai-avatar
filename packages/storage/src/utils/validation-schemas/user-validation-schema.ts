import type { zod } from "@ai-avatar/dash"
import {
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod"

import { user } from "@/schema"

export const userInsertSchema = createInsertSchema(user)

export const userUpdateSchema = createUpdateSchema(user)

export type UserInsertSchema = zod.infer<
  typeof userInsertSchema
>

export type UserUpdateSchema = zod.infer<
  typeof userUpdateSchema
>
