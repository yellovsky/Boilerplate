import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { WORKOUTS_NS, WorkoutCard } from '@features/workouts';

import { type GetManyWorkoutsVariables, useManyWorkoutsQuery } from '@entities/workouts';

interface WorkoutsPageProps {
  workoutsVars: GetManyWorkoutsVariables;
}

export const WorkoutsPage: FC<WorkoutsPageProps> = ({ workoutsVars }) => {
  const { data, fetchNextPage, hasNextPage } = useManyWorkoutsQuery(workoutsVars);

  const workouts = data?.pages.flatMap((p) => p.data.items);

  const { t } = useTranslation(WORKOUTS_NS);

  return (
    <div>
      <h2>Plural</h2>
      <div>number: 1: {t('plural {{number}} test', { number: 1 })}</div>
      <div>number: 100: {t('plural {{number}} test', { number: 100 })}</div>

      <h2>Select</h2>
      <div>select: foo: {t('select {{value}} test', { value: 'foo' })}</div>
      <div>select: buz: {t('select {{value}} test', { value: 'buz' })}</div>
      <div>select: bar: {t('select {{value}} test', { value: 'bar' })}</div>

      <h2>Date</h2>
      <div>short: {t('date {{date}} short test', { date: new Date() })}</div>
      <div>full: {t('date {{date}} full test', { date: new Date() })}</div>

      <h2>Nested</h2>
      <div>parent.nested: {t('parent.nested {{value}}', { value: 'tst' })}</div>
      <div>male - 1: {t('nested test {{gender}} {{count}}', { count: 1, gender: 'male' })}</div>
      <div>male - 2: {t('nested test {{gender}} {{count}}', { count: 2, gender: 'male' })}</div>
      <div>female - 1: {t('nested test {{gender}} {{count}}', { count: 1, gender: 'female' })}</div>
      <div>female - 2: {t('nested test {{gender}} {{count}}', { count: 2, gender: 'female' })}</div>

      {workouts?.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
      <button disabled={!hasNextPage} onClick={() => fetchNextPage()} type="button">
        load more
      </button>
      <br />
    </div>
  );
};
