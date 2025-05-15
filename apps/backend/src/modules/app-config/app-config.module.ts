import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigServiceImpl } from './app-config.service';
import { APP_CONFIG_SRV } from './app-config.types';

@Global()
@Module({
  exports: [APP_CONFIG_SRV],
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [{ provide: APP_CONFIG_SRV, useClass: AppConfigServiceImpl }],
})
export class AppConfigModule {}
