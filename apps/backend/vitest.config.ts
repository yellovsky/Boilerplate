import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
	plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],

  test: {
    globals: true,
			root: './',

    coverage: {
      all: false,
      include: ['src/**'],
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
    },
  },

	resolve: {
    alias: {
      'src': resolve(__dirname, './src'),
    },
  },
});
