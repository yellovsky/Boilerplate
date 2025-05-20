import { type QueryClient, type QueryFunction, useQuery } from '@tanstack/react-query';

import type { FailedResponse, GetOneWorkoutQuery, GetOneWorkoutResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

import { WORKOUTS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const WORKOUT_Q_KEY_TOKEN = 'workout';

export type GetOneWorkoutVariables = GetOneWorkoutQuery & { slugOrId: string };

type GetOneWorkoutQKey = readonly [
  typeof WORKOUTS_ENTITY_QUERY_KEY_TOKEN,
  typeof WORKOUT_Q_KEY_TOKEN,
  GetOneWorkoutVariables,
];

const makeGetOneWorkoutQKey = (variables: GetOneWorkoutVariables): GetOneWorkoutQKey => [
  WORKOUTS_ENTITY_QUERY_KEY_TOKEN,
  WORKOUT_Q_KEY_TOKEN,
  variables,
];

const getOneWorkout =
  (apiClient: ApiClient): QueryFunction<GetOneWorkoutResponse, GetOneWorkoutQKey> =>
  ({ queryKey, signal }) => {
    const variables: GetOneWorkoutVariables = queryKey[2];
    const { slugOrId, ...params } = variables;

    return apiClient.get<GetOneWorkoutResponse>(`/v1/workouts/${slugOrId}`, {
      params,
      signal,
    });
  };

const getWorkoutQueryResult = (
  queryClient: QueryClient,
  variables: GetOneWorkoutVariables
): GetOneWorkoutResponse | null => {
  const result = queryClient.getQueryData<GetOneWorkoutResponse>(makeGetOneWorkoutQKey(variables));
  return result || null;
};

export const prefetchOneWorkoutQuery = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: GetOneWorkoutVariables
): Promise<GetOneWorkoutResponse> => {
  await queryClient.prefetchQuery({
    queryFn: getOneWorkout(apiClient),
    queryKey: makeGetOneWorkoutQKey(variables),
  });

  const response = getWorkoutQueryResult(queryClient, variables);
  if (!response) throw new Error('Workout not found');

  return response;
};

export const useWorkoutQuery = (variables: GetOneWorkoutVariables) => {
  const apiClient = useApiClient();

  return useQuery<GetOneWorkoutResponse, FailedResponse, GetOneWorkoutResponse, GetOneWorkoutQKey>({
    queryFn: getOneWorkout(apiClient),
    queryKey: makeGetOneWorkoutQKey(variables),
  });
};
