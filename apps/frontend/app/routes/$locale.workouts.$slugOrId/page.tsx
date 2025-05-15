import type { FC } from 'react';

import { Paragraph } from '@repo/ui';

import { type GetOneWorkoutVariables, useWorkoutQuery } from '@entities/workouts';

interface WorkoutPageProps {
  workoutVariables: GetOneWorkoutVariables;
}

export const WorkoutPage: FC<WorkoutPageProps> = (props) => {
  const query = useWorkoutQuery(props.workoutVariables);

  return (
    <div>
      {JSON.stringify(props.workoutVariables)}
      <br />
      data: {JSON.stringify(query.data)}
      <br />
      <Paragraph>status: {query.status}</Paragraph>
    </div>
  );
};
