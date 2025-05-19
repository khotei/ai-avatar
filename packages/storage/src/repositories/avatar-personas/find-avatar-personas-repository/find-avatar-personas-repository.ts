import {
  bind,
  first,
  type RequireAtLeastOne,
  when,
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
  const query = database
    .select()
    .from(avatarPersona)
    .$dynamic()

  const where = and(...buildEq(avatarPersona, findParams))

  when(metaParams?.limit, bind(query.limit, query))
  when(metaParams?.offset, bind(query.offset, query))

  when(where, bind(query.where, query))

  return query.execute()
}

export const findAvatarPersona = async (
  findParams: FindAvatarPersonasParams
) =>
  first(await findAvatarPersonas(findParams, { limit: 1 }))
