import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger as NestLogger } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.enableCors();

  const port = app.get(ConfigService).get('appConfig').port;

  await app.listen(port);

  const logger = new NestLogger('AppBootstrap');
  logger.log(`Listening on ${await app.getUrl()}`);
}
bootstrap();
