import { map, required, toPairs } from "@ai-avatar/dash"
import { eq } from "drizzle-orm"
import type { PgTableWithColumns } from "drizzle-orm/pg-core"

export const buildEq = <
  // @eslint-ignore @todo: fix any
  TSchema extends PgTableWithColumns<any>,
  TParams extends Partial<TSchema["_"]["inferSelect"]>,
>(
  schema: TSchema,
  params: TParams
) =>
  map(toPairs(params), ([key, value]) =>
    eq(required(schema[key]), value)
  )
