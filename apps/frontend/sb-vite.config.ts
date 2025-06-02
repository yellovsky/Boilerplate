import { resolve } from 'node:path';

import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { reactRouterDevTools } from 'react-router-devtools';
import { reactRouterHonoServer } from 'react-router-hono-server/dev';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tailwindcss(),

    {
      ...babel({
        filter: /\.tsx?$/,

        babelConfig: {
          plugins: ['babel-plugin-react-compiler'],
          presets: ['@babel/preset-typescript'],
        },
      }),
    },
    tsconfigPaths(),
  ],

  ssr: {
    noExternal: [
      // these pachkages are internal monorepo packages
      '@repo/api-models',

      // this packages are cjs and must be compiled to be used with esm
      'jotai-tanstack-query',
    ],
  },

  resolve: {
    alias: {
      '@app': resolve('app/app'),
      '@entities': resolve('app/entities'),
      '@features': resolve('app/features'),
      '@shared': resolve('app/shared'),
      '@widgets': resolve('app/widgets'),
    },
  },
});
