import { dehydrate } from '@tanstack/query-core';

import { getApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { type GetManyWorkoutsVariables, prefetchManyWorkoutsQuery } from '@entities/workouts';

import type { Route } from './+types';

export const loadWorkoutsRouteData = async ({ params }: Route.LoaderArgs | Route.ClientLoaderArgs) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const workoutsVars: GetManyWorkoutsVariables = {
    locale: params.locale,
    sort: '-createdAt',
  };

  await prefetchManyWorkoutsQuery(apiClient, queryClient, workoutsVars);

  return { dehydratedState: dehydrate(queryClient), workoutsVars };
};
