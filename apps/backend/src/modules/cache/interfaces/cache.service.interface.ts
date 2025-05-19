import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

export type CacheKey = {
  workspace: string;
  pathname: string;
  params?: string[];
  query?: Record<string, unknown>;
};

export interface AppCacheService {
  wrap<T>(reqCtx: RequestContext, key: CacheKey, fn: () => Promise<T>, ttlInSeconds?: number): Promise<T>;
  get<T>(reqCtx: RequestContext, key: CacheKey): Promise<T | null>;
  set<T>(reqCtx: RequestContext, key: CacheKey, value: T, ttlInSeconds?: number): Promise<T>;
  del(reqCtx: RequestContext, key: CacheKey | string): Promise<void>;
}

export const APP_CACHE_SRV = 'APP_CACHE_SRV' as InjectableIdentifier<AppCacheService>;
