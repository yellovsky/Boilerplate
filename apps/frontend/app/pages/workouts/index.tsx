import { HydrationBoundary } from '@tanstack/react-query';

import type { Route } from './+types';
import { loadWorkoutsRouteData } from './load-data';
import { WorkoutsPage } from './page';

export async function loader(args: Route.LoaderArgs) {
  return loadWorkoutsRouteData(args);
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
  return loadWorkoutsRouteData(args);
}

export default function WorkoutsRoure(props: Route.ComponentProps) {
  return (
    <HydrationBoundary state={props.loaderData.dehydratedState}>
      <WorkoutsPage workoutsVars={props.loaderData.workoutsVars} />
    </HydrationBoundary>
  );
}
