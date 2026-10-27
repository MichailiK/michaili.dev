import type { Plugin } from "prettier";

import BASE from "@ili/configs/prettier/base";
import { mergeConfigs } from "@ili/configs/prettier/utils";
import * as prettierPluginAstro from "prettier-plugin-astro";

export default mergeConfigs(BASE, {
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],

  plugins: [
    // the type of this plugin doesnt quite match what Prettier expects
    prettierPluginAstro as Plugin,
  ],
});
