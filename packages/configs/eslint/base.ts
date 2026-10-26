import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import { type Config, defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

import { convertConfigRulesToWarns } from "./utils.ts";

/**
 * The base typescript-eslint config.
 *
 * Most rules in this config are converted to warnings to emphasize
 * TypeScript compiler errors (with the exception of a few TS-ESLint rules.)
 *
 * Note that the default export of this module, {@link CONFIG}, should be used
 * in most cases
 */
export const TS_ESLINT_BASE: Config[] = defineConfig([
  // Use ts-eslint's configs, converted from errors to warnings
  convertConfigRulesToWarns(...tseslint.configs.strictTypeChecked),
  convertConfigRulesToWarns(...tseslint.configs.stylisticTypeChecked),
  {
    rules: {
      "@typescript-eslint/no-base-to-string": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        // Replicate TypeScript compiler's unused variables detection
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
        },
      ],
      // Turn the below rules into errors, as they can show up as
      // (user-facing) bugs.
      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/restrict-template-expressions": "error",
    },
  },
  // Tell TS-ESLint to use TypeScript APIs
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
]);

/**
 * The base ESLint config to be used across the monorepo.
 *
 * Most rules in this config are converted to warnings to emphasize
 * TypeScript compiler errors (with the exception of a few TS-ESLint rules.)
 */
export const CONFIG: Config[] = defineConfig([
  convertConfigRulesToWarns(eslint.configs.recommended),
  ...TS_ESLINT_BASE,
  eslintConfigPrettier,
  convertConfigRulesToWarns(perfectionist.configs["recommended-alphabetical"]),
  {
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
      reportUnusedInlineConfigs: "warn",
    },
  },
]);

export default CONFIG;
