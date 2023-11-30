/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-11-30 21:31:24
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-11-30 21:48:27
 * @FilePath: \oms-platform-app\.eslintrc.js
 * @Description: ESLint 检查 .vue 文件需要单独配置编辑器 ==> https://eslint.vuejs.org/user-guide/#editor-integrations
 */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ["src/**/*.ts"],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
        extraFileExtensions: [".vue"],
      },
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      excludedFiles: "*.test.ts",
    },
  ],
  rules: {
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-debugger': 'warn',
    'no-case-declarations': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
}
