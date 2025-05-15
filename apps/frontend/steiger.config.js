// FIXME Make it work
import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

export default defineConfig([
  ...fsd.configs.recommended,
  { rules: { 'fsd/no-ui-in-app': 'off' } },
  {
    files: ['./src/renderer/src/shared/ui/styles/**'],
    rules: { 'fsd/public-api': 'off' },
  },
]);
