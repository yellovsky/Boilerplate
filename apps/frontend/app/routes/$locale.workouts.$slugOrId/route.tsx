import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { useLoaderData } from 'react-router';

import { getLoaderApiClient } from '@shared/lib/api-client';
import { getQueryClient } from '@shared/lib/query-client';

import { type GetOneWorkoutVariables, prefetchBlogPostQuery } from '@entities/workouts';

import type { Route } from './+types/route';
import { WorkoutPage } from './page';

export async function loader({ context, params }: Route.LoaderArgs) {
  const { locale, slugOrId } = params;

  const queryClient = getQueryClient();
  const apiClient = getLoaderApiClient(context.clientEnv.REMIX_PUBLIC_API_HOST);

  const workoutVariables: GetOneWorkoutVariables = { locale, slugOrId };
  await prefetchBlogPostQuery(apiClient, queryClient, workoutVariables);

  return {
    dehydratedState: dehydrate(queryClient),
    workoutVariables,
  };
}

export default function WorkoutRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <HydrationBoundary state={data.dehydratedState}>
      <WorkoutPage workoutVariables={data.workoutVariables} />
    </HydrationBoundary>
  );
}
