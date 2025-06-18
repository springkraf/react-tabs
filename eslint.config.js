// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

import typescriptParser from '@typescript-eslint/parser';
import _import from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import typescriptEslint from 'typescript-eslint';

// export default tseslint.config(
//   { ignores: ['dist'] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// )

export default defineConfig([
  eslintPluginPrettierRecommended,
  {
    plugins: {
      import: _import.configs.recommended.plugins,
      react: react.configs.recommended.plugins,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': typescriptEslint.plugin,
    },
    languageOptions: {
      parser: typescriptParser,
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
          'no-inline-styles': false,
          tabWidth: 2,
          useTabs: false,
          singleQuote: true,
          trailingComma: 'all',
          endOfLine: 'lf',
        },
      ],

      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],

      // 'import/order': [
      //   'warn',
      //   {
      //     groups: ['builtin', 'external', 'internal'],

      //     pathGroups: [
      //       {
      //         pattern: '@',
      //         group: 'external',
      //         position: 'before',
      //       },
      //       {
      //         pattern: '@app/**',
      //         group: 'internal',
      //       },
      //     ],

      //     pathGroupsExcludedImportTypes: ['internal'],
      //     'newlines-between': 'always',

      //     alphabetize: {
      //       order: 'asc',
      //       caseInsensitive: true,
      //     },
      //   },
      // ],

      'react-native/no-inline-styles': 0,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'no-use-before-define': [
        'error',
        {
          variables: false,
        },
      ],

      'no-explicit-any': 0,
      'explicit-function-return-type': 0,
      camelcase: 0,
      'react/prop-types': 0,
      '@typescript-eslint/no-unused-vars': 'warn',

      'no-unused-expressions': [
        'error',
        {
          allowTernary: true,
        },
      ],

      // "react/no-unstable-nested-components": ["warn", {
      //     allowAsProps: true,
      //     customValidators: [],
      // }],
    },
  },
  globalIgnores(['dist/*', '**/node_modules', 'src/assets/*', 'src/stories']),
]);
