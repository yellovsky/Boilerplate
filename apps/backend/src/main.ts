import cookieParser from 'cookie-parser';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception-filter';
import { I18N_SRV } from './modules/i18n';
import { IdentifierOf } from './shared/utils/injectable-identifier';
import { setupRedoc } from './shared/utils/redoc.middleware';

const API_PREFIX = 'api';

const getSwaggerOptions = () =>
  new DocumentBuilder()
    .setTitle('Boilerplate')
    .setDescription('API for the boilerplate project')
    .setVersion('1.0')
    .addServer(`http://localhost:${process.env.API_PORT}/`, 'Local environment')
    .addBearerAuth(
      { bearerFormat: 'JWT', in: 'cookie', scheme: 'bearer', type: 'http' },
      'access-token',
    )
    .addGlobalParameters({
      description: 'User locale',
      in: 'query',
      name: 'locale',
      style: 'simple',
    })
    .build();

async function bootstrap() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('Define SESSION_SECRET process variable');

  const webClientHostname = process.env.WEB_CLIENT_HOSTNAME;
  if (typeof webClientHostname !== 'string') {
    throw new Error('process.env.WEB_CLIENT_HOSTNAME must be provided');
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: { origin: [webClientHostname] },
  });

  app.enableCors({ credentials: true, origin: webClientHostname });
  app.set('trust proxy', 1);
  app.set('query parser', 'extended');

  const i18nSrv = app.get<IdentifierOf<typeof I18N_SRV>>(I18N_SRV);

  await i18nSrv.init();

  app
    .setGlobalPrefix(API_PREFIX)
    .use(cookieParser())
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    .useGlobalFilters(new HttpExceptionFilter(i18nSrv))
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .enableVersioning({ type: VersioningType.URI });

  const document = SwaggerModule.createDocument(app, getSwaggerOptions());
  SwaggerModule.setup(`${API_PREFIX}/:version/docs`, app, document);
  app.use('/swagger-json', (_: unknown, res: Response) => res.json(document));

  // app.enableShutdownHooks();
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const port = process.env.API_PORT;
  if (!port) throw new Error('process.env.API_PORT must be provided');

  setupRedoc(app);

  await app.listen(port);
}

bootstrap();
