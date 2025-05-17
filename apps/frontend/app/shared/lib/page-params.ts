import type { GetNextPageParamFunction } from '@tanstack/query-core';

import type { ItemsWithPagination, PageRequest, SuccessResponse } from '@repo/api-models';

import { PAGE_SIZE } from '@shared/config';

export const initialPageParam: PageRequest = { limit: PAGE_SIZE, offset: 0 } as const;

export const getNextPageParam: GetNextPageParamFunction<PageRequest, SuccessResponse<ItemsWithPagination<unknown>>> = (
  lastPage,
  allPages
) => {
  const total = lastPage.data.pagination.total;
  const pageSize = PAGE_SIZE;
  const limit = pageSize;
  const offset = allPages.length * pageSize;
  return offset > total ? null : { limit, offset };
};
