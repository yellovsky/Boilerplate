import type Redis from 'ioredis';

import type { InjectableIdentifier } from 'src/shared/utils/injectable-identifier';

export interface RedisService extends Redis {}

export const REDIS_SRV = 'REDIS_SRV' as InjectableIdentifier<RedisService>;
