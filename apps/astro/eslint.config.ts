import BASE_CONFIG from "@ili/configs/eslint/jsx";
import eslintPluginAstro from "eslint-plugin-astro";
import { defineConfig } from "eslint/config";

export default defineConfig([
  BASE_CONFIG,
  eslintPluginAstro.configs.recommended,
]);
