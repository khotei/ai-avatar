import path from "node:path"
import process from "node:process"

export const getExecPath = (): string => {
  const { INIT_CWD: execPath } = process.env

  if (!execPath) {
    throw new Error("Could not find module path")
  }

  return execPath
}

export const getTsConfigPath = (
  execPath: string
): string => {
  return path.join(execPath, "./tsconfig.json")
}

/**
 * Get the path to the source directory
 * @param execPath The execution path
 * @returns The path to the source directory
 */
export const getSourcePath = (execPath: string): string => {
  return path.join(execPath, "./src")
}
