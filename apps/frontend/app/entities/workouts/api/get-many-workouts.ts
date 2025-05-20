import { type InfiniteData, type QueryClient, type QueryFunction, useInfiniteQuery } from '@tanstack/react-query';

import type { FailedResponse, GetManyWorkoutsQuery, GetManyWorkoutsResponse, PageRequest } from '@repo/api-models';

import { type ApiClient, useApiClient } from '@shared/lib/api-client';
import { getNextPageParam, initialPageParam } from '@shared/lib/page-params';

import { WORKOUTS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

const WORKOUTS_QUERY_KEY_TOKEN = 'workouts';

export type GetManyWorkoutsVariables = Omit<GetManyWorkoutsQuery, 'page'>;
type GetManyWorkoutsQKey = readonly [
  typeof WORKOUTS_ENTITY_QUERY_KEY_TOKEN,
  typeof WORKOUTS_QUERY_KEY_TOKEN,
  GetManyWorkoutsVariables,
];

const makeGetManyWorkoutsQKey = (variables: GetManyWorkoutsVariables): GetManyWorkoutsQKey => [
  WORKOUTS_ENTITY_QUERY_KEY_TOKEN,
  WORKOUTS_QUERY_KEY_TOKEN,
  variables,
];

const getManyWorkouts =
  (apiClient: ApiClient): QueryFunction<GetManyWorkoutsResponse, GetManyWorkoutsQKey, PageRequest> =>
  async ({ queryKey, pageParam, signal }) => {
    const variables: GetManyWorkoutsVariables = queryKey[2];
    const params = { ...variables, page: pageParam };
    return apiClient.get<GetManyWorkoutsResponse>('/v1/workouts', { params, signal });
  };

export const prefetchManyWorkoutsQuery = async (
  apiClient: ApiClient,
  queryClient: QueryClient,
  variables: GetManyWorkoutsVariables
): Promise<void> => {
  await queryClient.prefetchInfiniteQuery({
    getNextPageParam,
    initialPageParam,
    queryFn: getManyWorkouts(apiClient),
    queryKey: makeGetManyWorkoutsQKey(variables),
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
    getNextPageParam,

    initialPageParam,
    queryFn: getManyWorkouts(apiClient),
    queryKey: makeGetManyWorkoutsQKey(variables),
  });
};
