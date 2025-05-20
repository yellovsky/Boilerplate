import type { QueryClient } from '@tanstack/query-core';

import { WORKOUTS_ENTITY_QUERY_KEY_TOKEN } from '../config/tokens';

export const invalidateWorkoutsQuery = (queryClient: QueryClient): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: [WORKOUTS_ENTITY_QUERY_KEY_TOKEN] });
