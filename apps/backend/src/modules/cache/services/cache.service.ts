import { Inject, Injectable } from '@nestjs/common';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';
import type { RequestContext } from 'src/shared/utils/request-context';

import { DEFAULT_CACHE_TTL_SEC } from '../config';
import type { AppCacheService, CacheKey } from '../interfaces/cache.service.interface';
import { REDIS_SRV } from '../interfaces/redis.service.interface';

@Injectable()
export class AppCacheServiceImpl implements AppCacheService {
  constructor(
    @Inject(REDIS_SRV)
    private readonly redisService: IdentifierOf<typeof REDIS_SRV>
  ) {}

  private buildKey(reqCtx: RequestContext, key: CacheKey): string {
    const sortedKey = {
      accountId: reqCtx.accountId,
      fallbackLocale: reqCtx.locale,
      params: key.params,
      pathname: key.pathname,
      profileId: reqCtx.profileId,

      query: key.query
        ? Object.entries(key.query)
            .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
            // biome-ignore lint/performance/noAccumulatingSpread: it's really any object
            .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {})
        : undefined,
    };

    return `${key.workspace}:${JSON.stringify(sortedKey)}`;
  }

  async wrap<T>(
    reqCtx: RequestContext,
    key: CacheKey,
    fn: () => Promise<T>,
    ttlInSeconds = DEFAULT_CACHE_TTL_SEC
  ): Promise<T> {
    const cacheKey = this.buildKey(reqCtx, key);

    const cached = await this.redisService.get(cacheKey);
    if (cached) return JSON.parse(cached) as T;

    const result = await fn();

    await this.redisService.set(cacheKey, JSON.stringify(result));
    await this.redisService.expire(cacheKey, ttlInSeconds);

    return result;
  }

  async get<T>(reqCtx: RequestContext, key: CacheKey): Promise<T | null> {
    const cacheKey = this.buildKey(reqCtx, key);
    const result = await this.redisService.get(cacheKey);
    return result ? (JSON.parse(result) as T) : null;
  }

  async set<T>(reqCtx: RequestContext, key: CacheKey, value: T, ttlInSeconds = DEFAULT_CACHE_TTL_SEC): Promise<T> {
    const cacheKey = this.buildKey(reqCtx, key);

    await this.redisService.set(cacheKey, JSON.stringify(value));
    await this.redisService.expire(cacheKey, ttlInSeconds);

    return value;
  }

  async del(reqCtx: RequestContext, key: CacheKey | string): Promise<void> {
    if (typeof key !== 'string') {
      await this.redisService.del(this.buildKey(reqCtx, key));
      return;
    }

    const keys = await this.redisService.keys(`${key}:*`);
    if (keys.length) await this.redisService.del(keys);
  }
}
