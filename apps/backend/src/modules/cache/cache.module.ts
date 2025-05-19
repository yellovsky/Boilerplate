import { Global, Module } from '@nestjs/common';

import { APP_CACHE_SRV } from './interfaces/cache.service.interface';
import { REDIS_SRV } from './interfaces/redis.service.interface';
import { AppCacheServiceImpl } from './services/cache.service';
import { RedisServiceImpl } from './services/redis.service';

@Global()
@Module({
  exports: [APP_CACHE_SRV],
  providers: [
    { provide: APP_CACHE_SRV, useClass: AppCacheServiceImpl },
    { provide: REDIS_SRV, useClass: RedisServiceImpl },
  ],
})
export class AppCacheModule {}
