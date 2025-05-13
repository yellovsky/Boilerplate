import { LoaderFunctionArgs } from '@remix-run/node';
import { QueryClient } from '@tanstack/query-core';

import { getQueryClient } from './query-client';
import { ApiClient, getApiClient } from './api-client';

export type GetLoaderData<TData> = (
  apiClient: ApiClient,
  queryClient: QueryClient,
  loaderArgs: LoaderFunctionArgs,
) => Promise<TData>;

export const makeLoader = <TLoaderData>(getLoaderData: GetLoaderData<TLoaderData>) => {
  const apiClient = getApiClient();
  const queryClient = getQueryClient();

  return (loaderArgs: LoaderFunctionArgs): Promise<TLoaderData> =>
    getLoaderData(apiClient, queryClient, loaderArgs);
};
