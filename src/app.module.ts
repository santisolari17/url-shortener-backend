import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ControllersModule } from './application/controllers/controllers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppConfigMap from './infrastructure/config/AppConfigMap';
import {
  RequestTracerMiddleware,
  REQUEST_TRACE_ID_HEADER,
} from './infrastructure/middlewares/requestTracer.middleware';
import { EAppEnvironment } from './infrastructure/enums/EAppEnvironment';
import { AppConfigModel } from './infrastructure/config/AppConfigModel';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ControllersModule,
    ConfigModule.forRoot({
      load: [AppConfigMap],
      envFilePath: '.env',
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const appConfig: AppConfigModel = config.get('appConfig');

        const transport =
          appConfig.environment === EAppEnvironment.PRODUCTION
            ? { target: 'pino-pretty', options: { singleLine: true, messageKey: 'message' } }
            : undefined;
        const level = appConfig.environment === EAppEnvironment.Local ? 'debug' : 'info';

        const disabledHttpDataSerializers = {
          req: () => undefined,
          res: () => undefined,
        };
        const serializers = appConfig.environment === EAppEnvironment.Local ? disabledHttpDataSerializers : null;

        /**
         * Use WeakSet to avoid "customProps" adding the properties twice
         * https://github.com/pinojs/pino-http/issues/216
         */
        const requestsSeen = new WeakSet();

        return {
          pinoHttp: {
            transport,
            level,
            autoLogging: {
              ignore: req => {
                const isRequestingHealth = req.url === '/' && req.method === 'GET';
                if (isRequestingHealth) {
                  return true;
                }
              },
            },
            serializers,
            customProps: req => {
              if (requestsSeen.has(req)) {
                return undefined;
              }

              requestsSeen.add(req);

              return { traceId: req[REQUEST_TRACE_ID_HEADER] };
            },
            messageKey: 'message',
          },
        };
      },
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestTracerMiddleware).forRoutes('*');
  }
}
