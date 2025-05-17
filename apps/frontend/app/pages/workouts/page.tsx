import type { FC } from 'react';

import { Paragraph } from '@repo/ui';

import { Link } from '@shared/ui/link';

import { type GetManyWorkoutsVariables, useManyWorkoutsQuery } from '@entities/workouts';

interface WorkoutsPageProps {
  workoutsVars: GetManyWorkoutsVariables;
}

export const WorkoutsPage: FC<WorkoutsPageProps> = ({ workoutsVars }) => {
  const { data, fetchNextPage, hasNextPage } = useManyWorkoutsQuery(workoutsVars);

  const workouts = data?.pages.flatMap((p) => p.data.items);

  return (
    <div>
      <Paragraph>workouts page</Paragraph>
      {workouts?.map((workout) => (
        <div key={workout.id}>
          <Link to={`/workouts/${workout.slug}`}>{workout.name}</Link>
        </div>
      ))}

      <button disabled={!hasNextPage} type="button" onClick={() => fetchNextPage()}>
        load more
      </button>
      <br />
    </div>
  );
};
