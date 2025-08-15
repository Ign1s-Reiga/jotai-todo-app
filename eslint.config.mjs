// @ts-check

import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import next from '@next/eslint-plugin-next';
import typescript from 'typescript-eslint';
import js from '@eslint/js';

const stylisticConfig = stylistic.configs.customize({
  semi: true,
  braceStyle: '1tbs',
  arrowParens: true,
});

export default [
  {
    ignores: ['.next/', '.yarn/', 'next-env.d.ts', '.pnp.cjs', '.pnp.loader.mjs'],
  },
  js.configs.recommended,
  ...typescript.configs.recommended,
  stylisticConfig,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'eslint.config.mjs', 'next.config.ts'],
    plugins: {
      '@next/next': next,
      react,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,

      '@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true }],
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      }],

      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/no-trailing-spaces': ['error', { ignoreComments: true }],
      '@stylistic/padded-blocks': 'off',
      '@stylistic/quote-props': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
