#!/usr/bin/env node
import { Command } from "commander"

import { lintCommand } from "../lib/lint"

const program = new Command()

program
  .name("lint")
  .description("ESLint tools for AI Avatar Framework")

program
  .description("Lint the source code")
  .option(
    "--fix",
    "Fix linting errors when possible",
    false
  )
  .action((options) => {
    lintCommand(options).catch(() => {
      process.exit(1)
    })
  })

program.parse()

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
