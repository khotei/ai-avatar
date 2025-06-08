import type { zod } from "@ai-avatar/dash"
import {
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod"

import { avatarPersona } from "@/schema"

export const avatarPersonaInsertSchema =
  createInsertSchema(avatarPersona)

export const avatarPersonaUpdateSchema =
  createUpdateSchema(avatarPersona)

export type AvatarPersonaInsertSchema = zod.infer<
  typeof avatarPersonaInsertSchema
>

export type AvatarPersonaUpdateSchema = zod.infer<
  typeof avatarPersonaUpdateSchema
>
