import tseslint from "typescript-eslint"

import { commonConfig } from "./common"

export const base = tseslint.config(...commonConfig)
