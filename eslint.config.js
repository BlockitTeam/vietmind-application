import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
    { ignores: ["dist", "node_modules"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            "no-console": ["error"],
            "no-unused-vars": "warn", // Warn for unused variables
            "react/prop-types": "off", // Disable React prop-types
            "@typescript-eslint/no-unused-vars": ["warn"],
            "react/jsx-curly-brace-presence": [
                "error",
                {
                    props: "never", // Enforces no curly braces for props unless necessary
                    children: "ignore", // Ignores the rule for children elements
                },
            ],
        },
    },
    eslintConfigPrettier,
    ...pluginQuery.configs["flat/recommended"],
);
