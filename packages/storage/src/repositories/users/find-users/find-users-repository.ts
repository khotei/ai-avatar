import {
  bind,
  first,
  type RequireAtLeastOne,
  when,
} from "@ai-avatar/dash"
import { and } from "drizzle-orm"

import { database } from "@/lib/database"
import { user } from "@/schema/user"
import { buildEq } from "@/utils/sql-utils/build-eq"

type FindUsersParams = RequireAtLeastOne<
  Pick<typeof user.$inferSelect, "email" | "id">
>
type MetaUsersParams = RequireAtLeastOne<{
  limit: number
  offset: number
}>

export const findUsers = async (
  findParams: FindUsersParams,
  metaParams?: MetaUsersParams
) => {
  const query = database.select().from(user).$dynamic()

  const where = and(...buildEq(user, findParams))

  when(metaParams?.limit, bind(query.limit, query))
  when(metaParams?.offset, bind(query.offset, query))

  when(where, bind(query.where, query))

  return query.execute()
}

export const findUser = async (
  findParams: FindUsersParams
) => first(await findUsers(findParams, { limit: 1 }))
