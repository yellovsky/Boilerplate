import { index, layout, prefix, type RouteConfig, route } from '@react-router/dev/routes';

export default [
  layout(
    'pages/home/layout.tsx',
    prefix(':locale', [
      index('pages/home/index.tsx'),
      route('workouts', 'pages/workouts/index.tsx'),
      route('workouts/:slugOrId', 'pages/workout/index.tsx'),
      route('*', 'pages/not-found/index.tsx'),
    ])
  ),
] satisfies RouteConfig;
