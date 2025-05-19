import { first, required } from "@ai-avatar/dash"
import type { InferInsertModel } from "drizzle-orm"

import { database } from "@/lib/database"
import { findUser } from "@/repositories/users/find-users/find-users-repository"
import { user } from "@/schema/user"

export const createUser = async (
  input: InferInsertModel<typeof user>
) => {
  const { id } = required(
    first(
      await database
        .insert(user)
        .values(input)
        .returning({ id: user.id })
    )
  )

  return required(await findUser({ id }))
}
