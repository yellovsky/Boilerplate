import { index, layout, prefix, type RouteConfig, route } from '@react-router/dev/routes';

export default [
  layout(
    'pages/home/layout.tsx',
    prefix(':locale', [
      index('pages/home/index.tsx'),

			...prefix('auth',

			[route('sign-in', 'features/auth/pages/SignInPage.tsx'),
      route('sign-up', 'features/auth/pages/SignUpPage.tsx'),
      route('forgot-password', 'features/auth/pages/ForgotPasswordPage.tsx'),]
			 ),

      route('workouts', 'pages/workouts/index.tsx'),
      route('workouts/:slugOrId', 'pages/workout/index.tsx'),
      route('*', 'pages/not-found/index.tsx'),
    ])
  ),
] satisfies RouteConfig;
