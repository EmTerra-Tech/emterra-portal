import { FlatCompat } from "@eslint/eslintrc";

import eslintConfigPrettier from "eslint-config-prettier";

import eslintPluginPrettier from "eslint-plugin-prettier";

import prettierConfig from "./.prettierrc";

const compat = new FlatCompat();

export default [
  // Convert legacy config from 'eslint-config-next'

  ...compat.config({
    extends: ["next", "next/core-web-vitals"],
  }),

  // Add Prettier plugin + config (optional, for formatting)

  {
    plugins: {
      prettier: eslintPluginPrettier,
    },

    rules: {
      "prettier/prettier": "error",

      "prettier/prettier": ["error", { endOfLine: "lf" }],
    },
  },

  eslintConfigPrettier,
  ...prettierConfig,
];
