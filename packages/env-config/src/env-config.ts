import path from "node:path"
import * as process from "node:process"

import dotenv from "dotenv"

dotenv.config({
  path: path.join(__dirname, "../../../.env"),
})

export const getEnvConfig = () => process.env
