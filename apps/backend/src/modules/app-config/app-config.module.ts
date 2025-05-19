import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { APP_CONFIG_SRV } from './interfaces/app-config.interface';
import { AppConfigServiceImpl } from './services/app-config.service';

@Global()
@Module({
  exports: [APP_CONFIG_SRV],
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [{ provide: APP_CONFIG_SRV, useClass: AppConfigServiceImpl }],
})
export class AppConfigModule {}
