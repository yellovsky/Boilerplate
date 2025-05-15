import babel from 'vite-plugin-babel';
import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import { reactRouterDevTools } from 'react-router-devtools';
import { reactRouterHonoServer } from 'react-router-hono-server/dev';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';
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
      apply: 'build',
    },

    reactRouterDevTools({ client: { position: 'middle-right' } }),

    reactRouter(),

    reactRouterHonoServer({
      dev: {
        exclude: [/^\/(resources)\/.+/],
      },
    }),
    tsconfigPaths(),
  ],

  ssr: {
    noExternal: [
      // these pachkages are internal monorepo packages
      '@repo/ui',
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
