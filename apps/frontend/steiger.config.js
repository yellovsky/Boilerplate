import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  { rules: { 'fsd/no-ui-in-app': 'off' } },
  {
    files: ['./src/renderer/src/shared/ui/styles/**'],
    rules: { 'fsd/public-api': 'off' },
  },
]);
