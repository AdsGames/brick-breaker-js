import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export default defineConfig(
  {
    ignores: [
      "node_modules/**",
      "eslint.config.mjs",
      "dist/**",
      "vite.config.ts",
    ],
  },
  js.configs.all,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    rules: {
      "one-var": "off",
      "sort-keys": "off",
      "no-ternary": "off",
      "sort-imports": "off",
      "require-atomic-updates": "off",
      camelcase: "off",
      "new-cap": "off",
      "no-undefined": "off",

      "max-classes-per-file": "off",
      "class-methods-use-this": "off",
      "max-lines-per-function": "off",
      "max-statements": "off",
      "max-params": "off",
      "no-magic-numbers": "off",
      complexity: "off",
      "func-style": "off",
      "no-plusplus": "off",
      "max-lines": "off",
      "no-await-in-loop": "off",
      "init-declarations": "off",
      "id-length": "off",

      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/no-type-alias": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/parameter-properties": "off",
      "@typescript-eslint/no-import-type-side-effects": "off",
      "@typescript-eslint/no-base-to-string": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
    },
  }
);
