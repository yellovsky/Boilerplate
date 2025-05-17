import { QueryClient } from '@tanstack/query-core';

const MINUTE = 60 * 1000;

const SERVER_STALE_TIME = MINUTE;
const CLIENT_STALE_TIME = Number.POSITIVE_INFINITY;

const SERVER_GC_TIME = 5 * MINUTE;
const CLIENT_GC_TIME = 30 * MINUTE;

const getServerQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: SERVER_GC_TIME,
        retry: false,
        staleTime: SERVER_STALE_TIME,
      },
    },
  });

let cached: QueryClient | null = null;
const getClientQueryClient = (): QueryClient => {
  if (!cached)
    cached = new QueryClient({
      defaultOptions: {
        mutations: {
          onError: (error) => console.error('Query Error:', error),
          retry: false,
        },
        queries: {
          gcTime: CLIENT_GC_TIME,
          retry: false,
          staleTime: CLIENT_STALE_TIME,
        },
      },
    });

  return cached;
};

export const getQueryClient = () => (typeof window === 'undefined' ? getServerQueryClient() : getClientQueryClient());
