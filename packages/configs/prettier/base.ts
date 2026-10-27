import type { Config } from "prettier";

import * as packageJsonPlugin from "prettier-plugin-packagejson";

export default {
  experimentalTernaries: true, // Primarily for TS conditional types
  objectWrap: "collapse",
  plugins: [packageJsonPlugin],
  proseWrap: "always",
} satisfies Config;
