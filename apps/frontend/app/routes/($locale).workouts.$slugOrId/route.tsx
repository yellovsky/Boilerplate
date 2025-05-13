import { HydrationBoundary } from '@tanstack/react-query';
import { useLoaderData } from '@remix-run/react';

import { makeLoader } from '~/shared/lib/loader';

import { getLoadWorkoutData } from './load-data.server';
import { WorkoutPage } from './page';

export const loader = makeLoader(getLoadWorkoutData);

export default function WorkoutRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <HydrationBoundary state={data.dehydratedState}>
      <WorkoutPage workoutVariables={data.workoutVariables} />
    </HydrationBoundary>
  );
}
