/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-11-30 21:31:24
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-01 08:03:11
 * @FilePath: \oms-platform-app\.eslintrc.js
 * @Description: ESLint 检查 .vue 文件需要单独配置编辑器 ==> https://eslint.vuejs.org/user-guide/#editor-integrations
 */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    wx: 'readonly',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        tabWidth: 4,
        singleQuote: true,
        semi: false,
        trailingComma: 'es5',
        arrowParens: 'always',
        endOfLine: 'auto',
        printWidth: 100,
      },
    ],
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
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
  },
}
