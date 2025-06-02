import { defineWorkspace } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineWorkspace([{
  extends: './vitest.config.ts',
  test: {
    environment: 'node',
    // Include generic .test files that should work anywhere and .server.test files for server only, ignore .browser.test
    include: ['./**/*.server.test.{ts,tsx}', '!./**/*.browser.test.{ts,tsx}', './**/*.test.{ts,tsx}'],
    name: 'server tests'
  }
}, {
  extends: './vitest.config.ts',
  optimizeDeps: {
    include: ['react/jsx-dev-runtime']
  },
  server: {
    fs: {
      strict: false
    }
  },
  test: {
    // Include generic .test files that should work anywhere and .browser.test files for browser only, ignore .server.test
    include: ['./**/*.test.{ts,tsx}', './**/*.browser.test.{ts,tsx}', '!./**/*.server.test.{ts,tsx}'],
    includeTaskLocation: true,
    name: 'browser tests',
    setupFiles: ['./tests/setup.browser.tsx'],
    browser: {
      enabled: true,
      instances: [{
        browser: 'chromium'
      }],
      provider: 'playwright'
      // https://playwright.dev
      //providerOptions: {},
    }
  }
}, {
  extends: 'vite.config.ts',
  plugins: [
  // The plugin will run tests for the stories defined in your Storybook config
  // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
  storybookTest({
    configDir: path.join(dirname, '.storybook')
  })],
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      instances: [{
        browser: 'chromium'
      }]
    },
    setupFiles: ['.storybook/vitest.setup.ts']
  }
}]);