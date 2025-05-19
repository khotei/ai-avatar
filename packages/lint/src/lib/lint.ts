import { ESLint } from "eslint"

import {
  createEslintInstance,
  formatResults,
} from "@/lib/eslint"
import { getExecPath, getSourcePath } from "@/utils/path"

export const runLint = async (
  isFix = false
): Promise<ESLint.LintResult[]> => {
  const execPath = getExecPath()
  const sourcePath = getSourcePath(execPath)
  const eslint = createEslintInstance(execPath, isFix)

  const results = await eslint.lintFiles(sourcePath)
  const { fixableProblems, problems } = await formatResults(
    eslint,
    results
  )

  if (isFix) {
    await ESLint.outputFixes(results)
  }

  if (
    (isFix && fixableProblems !== problems) ||
    (!isFix && problems > 0)
  ) {
    throw new Error("Linting errors found!")
  }

  return results
}

export const lintCommand = async (options: {
  fix?: boolean
}): Promise<void> => {
  await runLint(options.fix || false)
}
