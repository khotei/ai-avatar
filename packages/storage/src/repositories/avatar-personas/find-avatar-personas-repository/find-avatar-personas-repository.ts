import {
  first,
  type RequireAtLeastOne,
} from "@ai-avatar/dash"
import { and, isNull } from "drizzle-orm"

import { database } from "@/lib/database"
import { avatarInput } from "@/schema"
import { avatarPersona } from "@/schema/avatar-persona"
import { buildEq } from "@/utils/sql-utils/build-eq"

type FindAvatarPersonasParams = RequireAtLeastOne<
  Pick<
    typeof avatarPersona.$inferSelect,
    "avatarInputId" | "id" | "userId"
  >
>
type MetaAvatarPersonasParams = RequireAtLeastOne<{
  limit: number
  offset: number
}>

export const findAvatarPersonas = (
  findParams: FindAvatarPersonasParams,
  metaParams?: MetaAvatarPersonasParams
) =>
  database.query.avatarPersona.findMany({
    limit: metaParams?.limit,
    offset: metaParams?.offset,
    where: and(
      ...buildEq(avatarPersona, findParams),
      isNull(avatarInput.deletedAt)
    ),
    with: {
      avatarInput: true,
      user: true,
    },
  })

export const findAvatarPersona = async (id: string) =>
  first(await findAvatarPersonas({ id }, { limit: 1 }))
