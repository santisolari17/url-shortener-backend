import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { UrlShortenerService } from './UrlShortenerService/UrlShortener.service';

@Module({
  exports: [UrlShortenerService, InfrastructureModule],
  imports: [InfrastructureModule],
  providers: [UrlShortenerService],
})
export class ServicesModule {}
