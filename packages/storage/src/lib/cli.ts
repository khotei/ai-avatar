import { Command } from "commander"

import { dropSchema } from "@/utils/scripts/drop-schema"
import {
  cleanSeed,
  seedDatabase,
} from "@/utils/scripts/seed-database"

const program = new Command()

program
  .name("ai-avatar-storage")
  .description("CLI tools for AI Avatar Storage")

program
  .command("seed")
  .description("Seed the database with data")
  .option("--count", "Count of records to seed", "100")
  .option(
    "--clean",
    "Clean the database before seeding",
    true
  )
  .action((options) => {
    seedDatabase({
      clean: options?.clean,
      count: options?.count,
    }).catch(() => {
      process.exit(1)
    })
  })

program
  .command("clean")
  .description("Clean the database with data")
  .action(() => {
    cleanSeed().catch(() => {
      process.exit(1)
    })
  })

program
  .command("drop")
  .description("Drop all tables in the database")
  .action(() => {
    dropSchema().catch(() => {
      process.exit(1)
    })
  })

program.parse()

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
