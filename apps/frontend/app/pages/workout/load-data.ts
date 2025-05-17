import { dehydrate } from '@tanstack/query-core';

import { getApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { type GetOneWorkoutVariables, prefetchOneWorkoutQuery } from '@entities/workouts';

import type { Route } from './+types';

export const loadWrkoutRouteData = async ({ params }: Route.LoaderArgs | Route.ClientLoaderArgs) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  const getOneWorkoutVars: GetOneWorkoutVariables = {
    locale: params.locale,
    slugOrId: params.slugOrId,
  };

  const workoutResponse = await prefetchOneWorkoutQuery(apiClient, queryClient, getOneWorkoutVars);

  const workout = workoutResponse.data;

  return {
    ids: ['test', 'test-2'],
    workout,
    getOneWorkoutVars,
    dehydratedState: dehydrate(queryClient),
  };
};
