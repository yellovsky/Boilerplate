import { dehydrate, DehydratedState } from '@tanstack/query-core';

import { GetLoaderData } from '~/shared/lib/loader';
import { GetOneWorkoutVariables, prefetchBlogPostQuery } from '~/entities/workouts';

export interface WorkoutLoaderData {
  dehydratedState: DehydratedState;
  workoutVariables: GetOneWorkoutVariables;
}

export const getLoadWorkoutData: GetLoaderData<WorkoutLoaderData> = async (
  apiClient,
  queryClient,
  { params },
) => {
  const { locale, slugOrId } = params;
  if (!locale || !slugOrId) throw new Response('Bad request', { status: 400 });

  const workoutVariables = { locale, slugOrId };
  await prefetchBlogPostQuery(apiClient, queryClient, workoutVariables);

  return {
    dehydratedState: dehydrate(queryClient),
    workoutVariables,
  };
};
