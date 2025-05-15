import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { AppConfigService } from './app-config.types';

@Injectable()
export class AppConfigServiceImpl implements AppConfigService {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService
  ) {}

  get jwtSecret(): string {
    return this.configService.getOrThrow<string>('JWT_SECRET');
  }

  get webClientHostname(): string {
    return this.configService.getOrThrow<string>('WEB_CLIENT_HOSTNAME');
  }
}
