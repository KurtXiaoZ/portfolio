import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
import storybook from 'eslint-plugin-storybook';

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'storybook-static/**',
    'next-env.d.ts',
  ]),
  ...storybook.configs['flat/recommended'],
]);
