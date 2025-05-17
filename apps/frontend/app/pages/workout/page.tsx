import type { FC } from 'react';

import { Link } from '@shared/ui/link';

import { type GetOneWorkoutVariables, useWorkoutQuery } from '@entities/workouts';

export const WorkoutPage: FC<{ workoutVariables: GetOneWorkoutVariables }> = ({ workoutVariables }) => {
  const workoutResponse = useWorkoutQuery(workoutVariables);

  return (
    <div>
      <div>workout page</div>

      {['test', 'test-2'].map((id) => (
        <Link key={id} to={`/workouts/${id}`}>
          {id}
        </Link>
      ))}

      <div>Workout: {JSON.stringify(workoutResponse.data)}</div>
    </div>
  );
};
