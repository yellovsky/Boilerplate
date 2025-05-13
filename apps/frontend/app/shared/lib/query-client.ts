import { QueryClient } from '@tanstack/query-core';

const MINUTE = 60 * 1000;

const SERVER_STALE_TIME = MINUTE;
const CLIENT_STALE_TIME = Infinity;

const SERVER_GC_TIME = 5 * MINUTE;
const CLIENT_GC_TIME = 30 * MINUTE;

export const getQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      mutations: {
        onError: error => console.error('Query Error:', error),
        retry: false,
      },
      queries: {
        gcTime: typeof window === 'undefined' ? SERVER_GC_TIME : CLIENT_GC_TIME,
        retry: false,
        staleTime: typeof window === 'undefined' ? SERVER_STALE_TIME : CLIENT_STALE_TIME,
      },
    },
  });
