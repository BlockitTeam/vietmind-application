// eslint.config.mjs
import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"
import { fixupConfigRules } from "@eslint/compat"

// 👋 Import prettier plugins
import prettierConfig from "eslint-config-prettier" 
import pluginPrettier from "eslint-plugin-prettier"


export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2021,
        sourceType: "module",
      },
      globals: globals.browser,
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended, 
  ...fixupConfigRules(pluginReactConfig),

  {
    plugins: {
      prettier: pluginPrettier, // 👋 Add prettier plugin
    },
  },
  {
    settings: {
      react: { version: "detect" },
    },
  },
  {
    // Additional custom rules
    rules: {
      "no-console": "warn", 
      "no-unused-vars": "warn", 
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],

      // 👋 Add prettier rules at the bottom
      ...prettierConfig.rules, // Merge Prettier and ESLint rules
      "prettier/prettier": "error", // Show Prettier errors as ESLint errors
    },
  },
]