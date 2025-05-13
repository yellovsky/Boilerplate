import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import json from '@eslint/json';
// import css from '@eslint/css';

export default defineConfig([
  {
    ignores: ['.config/', 'coverage/', '**/dist/', 'tsconfig.json'],
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  {
    extends: [pluginReact.configs.flat.recommended],
    settings: { react: { version: 'detect' } },
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },
  // { files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'] },

  {
    files: ['**/*.ts', '**/*.tsx'],
    // TODO this ignorePatterns looks strange. Eslint fails when check css files.
    // Try to remove it
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-sort-props': ['error', { ignoreCase: true, shorthandFirst: true }],
      'sort-keys': [
        'error',
        'asc',
        { caseSensitive: false, minKeys: 2, natural: true, allowLineSeparatedGroups: true },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
          allowSeparatedGroups: true,
        },
      ],

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
]);
