import * as winston from 'winston';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';

import { AppConfigModule } from 'src/modules/app-config';
import { I18nModule } from 'src/modules/i18n';
import { PrismaModule } from 'src/modules/prisma';
import { WorkoutsModule } from 'src/modules/workouts';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'debug',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
            nestWinstonModuleUtilities.format.nestLike('api', {
              appName: false,
              processId: false,
            }),
          ),
        }),
      ],
    }),
    PassportModule.register({ session: true }),
    AppConfigModule,
    WorkoutsModule,
    I18nModule,
    PrismaModule,
  ],
})
export class AppModule {}
