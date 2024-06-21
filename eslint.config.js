// eslint.config.js
import { ESLint } from 'eslint';

const config = new ESLint({
  baseConfig: {
    extends: [
      'next',
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
  ignorePatterns: ['node_modules/', '.next/', 'out/'],
});

export default config;
