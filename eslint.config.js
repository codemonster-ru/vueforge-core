import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import vueParser from "vue-eslint-parser";

export default tseslint.config(
  {
    ignores: ["dist/**", "coverage/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  prettier,
  {
    files: ["**/*.{ts,vue,js}"],
    languageOptions: {
      parser: vueParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: "latest",
        extraFileExtensions: [".vue"],
        sourceType: "module",
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
);
