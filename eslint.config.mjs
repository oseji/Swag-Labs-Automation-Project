import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
    {
        ignores: [
            "node_modules/**",
            "allure-report/**",
            "allure-results/**",
            "dist/**",
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.js", "**/*.cjs"],
        languageOptions: {
            sourceType: "commonjs",
            globals: { module: "writable", require: "readonly" },
        },
    },
    {
        languageOptions: {
            globals: {
                process: "readonly",
                console: "readonly",
                Buffer: "readonly",
                Mocha: "readonly",
            },
        },
        rules: {
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" },
            ],
            "no-empty": ["error", { allowEmptyCatch: true }],
        },
    },
    prettier,
);
