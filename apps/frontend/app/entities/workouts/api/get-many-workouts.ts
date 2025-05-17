import { type InfiniteData, type QueryClient, type QueryFunction, useInfiniteQuery } from '@tanstack/react-query';

import type { FailedResponse, GetManyWorkoutsQuery, GetManyWorkoutsResponse, PageRequest } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getNextPageParam, initialPageParam } from '@shared/lib/page-params';

const WORKOUTS_Q_KEY_TOKEN = 'workouts';
export type GetManyWorkoutsVariables = Omit<GetManyWorkoutsQuery, 'page'>;
// TODO make querykey as ['workouts', 'list' | 'single', {params}] to revalidate all at once
type GetManyWorkoutsQKey = readonly [typeof WORKOUTS_Q_KEY_TOKEN, GetManyWorkoutsVariables];

const makeGetManyWorkoutsQKey = (variables: GetManyWorkoutsVariables): GetManyWorkoutsQKey => [
  WORKOUTS_Q_KEY_TOKEN,
  variables,
];

const getManyWorkouts =
  (apiClient: ApiClient): QueryFunction<GetManyWorkoutsResponse, GetManyWorkoutsQKey, PageRequest> =>
  async ({ queryKey, pageParam, signal }) => {
    const params = { ...queryKey[1], page: pageParam };

    return apiClient.get<GetManyWorkoutsResponse>('http://localhost:3001/api/v1/workouts', {
      params,
      signal,
    });
  };

export const prefetchManyWorkoutsQuery = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: GetManyWorkoutsVariables
): Promise<void> => {
  await queryClient.prefetchInfiniteQuery({
    queryFn: getManyWorkouts(apiClient),
    queryKey: makeGetManyWorkoutsQKey(variables),
    initialPageParam,
    getNextPageParam,
  });
};

export const useManyWorkoutsQuery = (variables: GetManyWorkoutsVariables) => {
  const apiClient = useApiClient();

  return useInfiniteQuery<
    GetManyWorkoutsResponse,
    FailedResponse,
    InfiniteData<GetManyWorkoutsResponse>,
    GetManyWorkoutsQKey,
    PageRequest
  >({
    queryFn: getManyWorkouts(apiClient),
    queryKey: makeGetManyWorkoutsQKey(variables),

    initialPageParam,
    getNextPageParam,
  });
};
