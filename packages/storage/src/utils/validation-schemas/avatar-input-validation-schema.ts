import type { zod } from "@ai-avatar/dash"
import {
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod"

import { avatarInput } from "@/schema"

export const avatarInputInsertSchema =
  createInsertSchema(avatarInput)

export const avatarInputUpdateSchema =
  createUpdateSchema(avatarInput)

export type AvatarInputInsertSchema = zod.infer<
  typeof avatarInputInsertSchema
>

export type AvatarInputUpdateSchema = zod.infer<
  typeof avatarInputUpdateSchema
>
