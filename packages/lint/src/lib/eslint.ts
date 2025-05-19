import { ESLint } from "eslint"

import { base } from "@/configs/base"
import { getTsConfigPath } from "@/utils/path"

export const createEslintInstance = (
  execPath: string,
  fix: boolean
): ESLint => {
  return new ESLint({
    fix,
    overrideConfig: [
      ...base,
      {
        languageOptions: {
          parserOptions: {
            project: [getTsConfigPath(execPath)],
          },
        },
      },
    ] as any,
    overrideConfigFile: true,
  })
}

export const formatResults = async (
  eslint: ESLint,
  results: ESLint.LintResult[]
): Promise<{
  fixableProblems: number
  problems: number
}> => {
  const problems = results.reduce(
    (sum, result) => sum + result.errorCount,
    0
  )
  const fixableProblems = results.reduce(
    (sum, result) => sum + result.fixableErrorCount,
    0
  )

  if (problems === 0) {
    console.log("No linting errors found.")
  } else {
    console.log(
      `Linting errors found! (${problems} problems, ${fixableProblems} fixable)`
    )
    const formatter = await eslint.loadFormatter("stylish")
    const formattedResults = await formatter.format(results)
    console.log(formattedResults)
  }

  return { fixableProblems, problems }
}
