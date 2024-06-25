import vue from "eslint-plugin-vue";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "@vue/typescript/recommended",
    "prettier",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
), {
    plugins: {
        vue,
        "@typescript-eslint": typescriptEslint,
        prettier,
    },

    languageOptions: {
        ecmaVersion: "latest",
        sourceType: "script",
    },

    rules: {
        "vue/component-api-style": ["error", ["script-setup"]],
        "vue/multi-word-component-names": "off",
        "prettier/prettier": "warn",
    },
}];