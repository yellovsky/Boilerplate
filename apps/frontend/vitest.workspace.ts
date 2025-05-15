import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    extends: './vitest.config.ts',
    test: {
      environment: 'node',
      // Include generic .test files that should work anywhere and .server.test files for server only, ignore .browser.test
      include: ['./**/*.server.test.{ts,tsx}', '!./**/*.browser.test.{ts,tsx}', './**/*.test.{ts,tsx}'],
      name: 'server tests',
    },
  },
  {
    extends: './vitest.config.ts',
    optimizeDeps: {
      include: ['react/jsx-dev-runtime'],
    },
    server: {
      fs: {
        strict: false,
      },
    },
    test: {
      // Include generic .test files that should work anywhere and .browser.test files for browser only, ignore .server.test
      include: ['./**/*.test.{ts,tsx}', './**/*.browser.test.{ts,tsx}', '!./**/*.server.test.{ts,tsx}'],
      includeTaskLocation: true,
      name: 'browser tests',
      setupFiles: ['./tests/setup.browser.tsx'],

      browser: {
        enabled: true,
        instances: [{ browser: 'chromium' }],

        provider: 'playwright',
        // https://playwright.dev
        //providerOptions: {},
      },
    },
  },
]);
