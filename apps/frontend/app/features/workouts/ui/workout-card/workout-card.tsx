import type { FC } from 'react';

import type { ShortWorkout } from '@repo/api-models';

import { Link } from '@shared/ui/link';

import { getWorkoutLink } from '@features/workouts/lib/links';

import styles from './workout-card.module.css';

interface WorkoutCardProps {
  workout: ShortWorkout;
}

export const WorkoutCard: FC<WorkoutCardProps> = (props) => {
  return (
    <Link className={styles.workoutCard} to={getWorkoutLink(props.workout)}>
      {props.workout.name}
      {props.workout.createdAt}
    </Link>
  );
};
