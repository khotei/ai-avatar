import js from "@eslint/js"
import perfectionist from "eslint-plugin-perfectionist"
import prettier from "eslint-plugin-prettier/recommended"
import unusedImports from "eslint-plugin-unused-imports"
import tseslint from "typescript-eslint"

export const commonConfig = [
  { ignores: ["dist"] },
  js.configs.all,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": [
        "error",
        "type",
      ],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      camelcase: "off",
      "capitalized-comments": "off",
      "class-methods-use-this": "off",
      complexity: "off",
      "consistent-return": "off",
      "init-declarations": "off",
      "max-lines": "off",
      "max-lines-per-function": "off",
      "max-statements": "off",
      "new-cap": "off",
      "no-console": "off",
      "no-else-return": "off",
      "no-magic-numbers": "off",
      "no-param-reassign": "off",
      "no-shadow": "off",
      "no-ternary": "off",
      "no-undefined": "off",
      "one-var": "off",
      "require-await": "off",
      "sort-imports": "off",
    },
  },
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "no-unused-vars": "warn",
      "unused-imports/no-unused-imports": "warn",
    },
  },
  {
    ...perfectionist.configs["recommended-alphabetical"],
    rules: {
      ...perfectionist.configs["recommended-alphabetical"]
        .rules,
      "perfectionist/sort-imports": [
        "error",
        {
          customGroups: {
            value: {
              builtin: "node:*",
            },
          },
          environment: "node",
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          ignoreCase: true,
          internalPattern: ["@/**"],
          newlinesBetween: "always",
          order: "asc",
          type: "alphabetical",
        },
      ],
    },
  },
  {
    ...prettier,
    rules: {
      ...prettier.rules,
      "prettier/prettier": [
        "error",
        {
          arrowParens: "always",
          bracketSameLine: true,
          bracketSpacing: true,
          endOfLine: "auto",
          htmlWhitespaceSensitivity: "css",
          insertPragma: false,
          jsxSingleQuote: false,
          printWidth: 60,
          proseWrap: "preserve",
          quoteProps: "as-needed",
          requirePragma: false,
          semi: false,
          singleAttributePerLine: true,
          singleQuote: false,
          tabWidth: 2,
          trailingComma: "es5",
        },
      ],
    },
  },
]
