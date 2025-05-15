import { type QueryClient, type QueryFunction, useQuery } from '@tanstack/react-query';

import type { FailedResponse, GetOneWorkoutQuery, GetOneWorkoutResponse } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';

const WORKOUT_Q_KEY_TOKEN = 'workout';
export type GetOneWorkoutVariables = GetOneWorkoutQuery & { slugOrId: string };
type GetOneWorkoutQKey = readonly [typeof WORKOUT_Q_KEY_TOKEN, GetOneWorkoutVariables];

const makeGetOneWorkoutQKey = (variables: GetOneWorkoutVariables): GetOneWorkoutQKey => [
  WORKOUT_Q_KEY_TOKEN,
  variables,
];

export const getOneWorkout =
  (apiClient: ApiClient): QueryFunction<GetOneWorkoutResponse, GetOneWorkoutQKey> =>
  ({ queryKey, signal }) => {
    const { slugOrId, ...params } = queryKey[1];

    return apiClient.get<GetOneWorkoutResponse>(`http://localhost:3001/api/v1/workouts/${slugOrId}`, {
      params,
      signal,
    });
  };

export const getWorkoutQueryResult = (
  queryClient: QueryClient,
  variables: GetOneWorkoutVariables
): GetOneWorkoutResponse | null => {
  const result = queryClient.getQueryData<GetOneWorkoutResponse>(makeGetOneWorkoutQKey(variables));
  return result || null;
};

export const prefetchBlogPostQuery = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: GetOneWorkoutVariables
): Promise<GetOneWorkoutResponse> => {
  await queryClient.prefetchQuery({
    queryFn: getOneWorkout(apiClient),
    queryKey: makeGetOneWorkoutQKey(variables),
  });

  const response = await getWorkoutQueryResult(queryClient, variables);
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
