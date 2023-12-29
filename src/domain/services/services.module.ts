import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { UrlShortenerService } from './UrlShortenerService/UrlShortener.service';
import { AppEventsService } from './AppEventsService/AppEvents.service';

@Module({
  exports: [UrlShortenerService, AppEventsService, InfrastructureModule],
  imports: [InfrastructureModule],
  providers: [UrlShortenerService, AppEventsService],
})
export class ServicesModule {}
