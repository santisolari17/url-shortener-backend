import { Module } from '@nestjs/common';
import { HealthModule } from '../../infrastructure/health/health.module';
import { UsecasesModule } from '../useCases/usecases.module';
import { AuthenticationController } from './Authentication/Authentication.controller';
import { HealthController } from './Health/health.controller';
import { UrlshortenerController } from './UrlShortener/UrlShortener.controller';

@Module({
  imports: [UsecasesModule, HealthModule],
  controllers: [HealthController, AuthenticationController, UrlshortenerController],
})
export class ControllersModule {}
