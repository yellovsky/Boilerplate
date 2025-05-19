import { Inject, Injectable, Logger, type OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

import type { IdentifierOf } from 'src/shared/utils/injectable-identifier';

import { APP_CONFIG_SRV } from '../../app-config';
import type { RedisService } from '../interfaces/redis.service.interface';

@Injectable()
export class RedisServiceImpl extends Redis implements OnModuleDestroy, RedisService {
  #logger = new Logger('RedisService');

  constructor(
    @Inject(APP_CONFIG_SRV)
    private readonly appConfigSrv: IdentifierOf<typeof APP_CONFIG_SRV>
  ) {
    super(appConfigSrv.redisUrl);

    this.on('connect', this.#handleConnect.bind(this));
    this.on('ready', this.#handleReady.bind(this));
    this.on('error', this.#handleError.bind(this));
    this.on('close', this.#handleClose.bind(this));
    this.on('reconnecting', this.#handleReconnecting.bind(this));
    this.on('end', this.#handleEnd.bind(this));
  }

  onModuleDestroy() {
    this.disconnect(false);
  }

  #handleConnect() {
    this.#logger.log('Redis connecting...');
  }

  #handleReady() {
    this.#logger.log('Redis connected!');
  }

  #handleClose() {
    this.#logger.warn('Redis disconnected!');
  }

  #handleReconnecting() {
    this.#logger.log('Redis reconnecting!');
  }

  #handleEnd() {
    this.#logger.warn('Redis connection ended!');
  }

  #handleError(_err: unknown) {
    // TODO add error log
    this.#logger.error('Redis error occurred');
  }
}
