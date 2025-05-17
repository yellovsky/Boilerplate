import { HydrationBoundary } from '@tanstack/react-query';

import type { Route } from './+types';
import { loadWrkoutRouteData } from './load-data';
import { WorkoutPage } from './page';

export async function loader(args: Route.LoaderArgs) {
  return loadWrkoutRouteData(args);
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
  return loadWrkoutRouteData(args);
}

export function meta(params: Route.MetaArgs) {
  return [
    { title: params.data.workout.seo.title || params.data.workout.name },
    { name: 'keywords', content: params.data.workout.seo.keywords },
    { name: 'description', content: params.data.workout.seo.description },
  ];
}

export function HydrateFallback() {
  return <p>Loading Game...</p>;
}

export default function WorkoutRoure(props: Route.ComponentProps) {
  return (
    <HydrationBoundary state={props.loaderData?.dehydratedState}>
      <WorkoutPage workoutVariables={props.loaderData.getOneWorkoutVars} />
    </HydrationBoundary>
  );
}
