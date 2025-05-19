import { database } from "@/lib/database"

export const dropSchema = async () => {
  await database.execute(`DROP SCHEMA public CASCADE;`)
  await database.execute(`CREATE SCHEMA public;`)
}
