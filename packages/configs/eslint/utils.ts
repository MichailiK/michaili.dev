import type { Linter } from "eslint";

/**
 * Creates a shallow copy of each provided config in {@link configs}
 * with all errors converted to warnings.
 *
 * @param configs The configurations
 */
export function convertConfigRulesToWarns(
  ...configs: Linter.Config[]
): Linter.Config[] {
  return configs.map((config) => {
    if (!config.rules) return config;

    return {
      ...config,
      rules: Object.fromEntries(
        Object.entries(config.rules).map(([key, value]) => [
          key,
          value ? convertLinterRuleErrorToWarning(value) : value,
        ]),
      ),
    };
  });
}

/**
 * Creates a shallow copy of the provided rule {@link value} if it is an error
 * and converts it to a warning. Otherwise, returns the original value.
 *
 * @param value The rule entry to convert
 */
export function convertLinterRuleErrorToWarning<Options extends unknown[]>(
  value: Linter.RuleEntry<Options>,
): Linter.RuleEntry<Options> {
  // "rule": "error" => "rule": "warn"
  if (typeof value === "string") {
    if (value === "error") return "warn";
    return value;
  }

  // "rule": 2 => "rule": 1
  if (typeof value === "number") {
    if (value === 2) return 1;
    return value;
  }

  if (Array.isArray(value)) {
    const [severity, ...rest] = value;

    // "rule": ["error", ...] => "rule": ["warn", ...]
    if (severity === "error") return ["warn", ...rest];
    // "rule": [2, ...] => "rule": [1, ...]
    if (severity === 2) return [1, ...rest];

    return value;
  }

  // Exhaustiveness check to ensure all possible RuleEntry types are handled.
  value satisfies never;

  // Unknown shapes are returned as-is.
  return value;
}
