import {
  bind,
  first,
  type RequireAtLeastOne,
  when,
} from "@ai-avatar/dash"
import { and } from "drizzle-orm"

import { database } from "@/lib/database"
import { avatarInput } from "@/schema/avatar-input"
import { buildEq } from "@/utils/sql-utils/build-eq"

type FindAvatarInputsParams = RequireAtLeastOne<
  Pick<typeof avatarInput.$inferSelect, "id" | "userId">
>
type MetaAvatarInputsParams = RequireAtLeastOne<{
  limit: number
  offset: number
}>

export const findAvatarsInput = async (
  findParams: FindAvatarInputsParams,
  metaParams?: MetaAvatarInputsParams
) => {
  const query = database
    .select()
    .from(avatarInput)
    .$dynamic()

  const where = and(...buildEq(avatarInput, findParams))

  when(metaParams?.limit, bind(query.limit, query))
  when(metaParams?.offset, bind(query.offset, query))

  when(where, bind(query.where, query))

  return query.execute()
}

export const findAvatarInput = async (
  findParams: FindAvatarInputsParams
) => first(await findAvatarsInput(findParams, { limit: 1 }))
