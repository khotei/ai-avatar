import {
  first,
  type RequireAtLeastOne,
} from "@ai-avatar/dash"
import { and, isNull } from "drizzle-orm"

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

export const findAvatarInputs = (
  findParams: FindAvatarInputsParams,
  metaParams?: MetaAvatarInputsParams
) =>
  database.query.avatarInput.findMany({
    limit: metaParams?.limit,
    offset: metaParams?.offset,
    where: and(
      ...buildEq(avatarInput, findParams),
      isNull(avatarInput.deletedAt)
    ),
    with: {
      avatarPersonas: true,
      user: true,
    },
  })

export const findAvatarInput = async (id: string) =>
  first(await findAvatarInputs({ id }, { limit: 1 }))
