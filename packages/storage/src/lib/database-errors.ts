import { camelCase } from "@ai-avatar/dash"
import {
  getTableConfig,
  type PgTableWithColumns,
} from "drizzle-orm/pg-core"

export class DatabaseError extends Error {}

export class DatabaseRecordNotFoundError<
  TSchema extends PgTableWithColumns<any>,
> extends DatabaseError {
  constructor(schema: TSchema, id: string) {
    super(
      `Schema ${camelCase(getTableConfig(schema).name)} doesn't have record with ID "${id}".`
    )
  }
}

export const isDatabaseRecordNotFoundError = (
  error: Error
): error is DatabaseRecordNotFoundError<any> =>
  error instanceof DatabaseRecordNotFoundError
