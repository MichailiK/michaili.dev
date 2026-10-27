import type { Config } from "prettier";

/**
 * Merges Prettier configs from left to right, merging `plugins` and `overrides`
 *
 * @param configs The Prettier configs
 */
export function mergeConfigs(...configs: Config[]): Config {
  const merged = Object.assign({}, ...configs) as Config;

  return {
    ...merged,
    overrides: configs.flatMap((config) => config.overrides ?? []),
    plugins: [...new Set(configs.flatMap((config) => config.plugins ?? []))],
  };
}
