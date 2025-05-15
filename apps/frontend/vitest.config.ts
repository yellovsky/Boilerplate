import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    css: true,
    globals: true,

    coverage: {
      all: false,
      include: ['app/**'],
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
    },
  },
});
