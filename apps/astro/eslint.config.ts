import BASE_CONFIG from "@ili/configs/eslint/jsx";
import eslintPluginAstro from "eslint-plugin-astro";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([".astro/"]),
  BASE_CONFIG,
  eslintPluginAstro.configs.recommended,
  // TypeScript's ProjectService cant parse astro files, so the legacy `project`
  // option gets used to make TS-ESLint build the project with the help of
  // astro-eslint-parser
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: {
        extraFileExtensions: [".astro"],
        parser: tseslint.parser,
        project: "./tsconfig.web.json",
        projectService: false,
      },
    },
  },
]);
