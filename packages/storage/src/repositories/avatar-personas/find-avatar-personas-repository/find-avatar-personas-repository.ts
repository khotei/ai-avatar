import {
  first,
  type RequireAtLeastOne,
} from "@ai-avatar/dash"
import { and } from "drizzle-orm"

import { database } from "@/lib/database"
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

export const findAvatarPersonas = async (
  findParams: FindAvatarPersonasParams,
  metaParams?: MetaAvatarPersonasParams
) => {
  const rows = await database.query.avatarPersona.findMany({
    limit: metaParams?.limit,
    offset: metaParams?.offset,
    where: and(...buildEq(avatarPersona, findParams)),
    with: {
      avatarInput: true,
      user: true,
    },
  })

  return rows
}

export const findAvatarPersona = async (
  findParams: FindAvatarPersonasParams
) =>
  first(await findAvatarPersonas(findParams, { limit: 1 }))
