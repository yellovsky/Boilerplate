import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
		environment: 'node',

    coverage: {
      all: false,
      include: ['src/**'],
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
    },
  },
});
