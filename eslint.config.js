// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'node_modules/**/*',
      'coverage/**/*',
      'dist/**/*',
      'config/**/*',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      quotes: [
        'warn',
        'single',
        {
          'avoidEscape': true,
          'allowTemplateLiterals': true
        }
      ],
      semi: 'warn',
      '@typescript-eslint/consistent-type-assertions': 'off',
      'no-constant-condition': 'off'
    }
  },
);
