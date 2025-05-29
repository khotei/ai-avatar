import {
  first,
  type RequireAtLeastOne,
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

export const findUsers = (
  findParams: FindUsersParams,
  metaParams?: MetaUsersParams
) =>
  database.query.user.findMany({
    limit: metaParams?.limit,
    offset: metaParams?.offset,
    where: and(...buildEq(user, findParams)),
  })

export const findUser = async (
  findParams: FindUsersParams
) => first(await findUsers(findParams, { limit: 1 }))
