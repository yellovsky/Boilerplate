import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { AppConfigService } from './app-config.types';

@Injectable()
export class AppConfigServiceImpl implements AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get jwtSecret(): string {
    return this.configService.getOrThrow<string>('JWT_SECRET');
  }

  get webClientHostname(): string {
    return this.configService.getOrThrow<string>('WEB_CLIENT_HOSTNAME');
  }
}
