import { Module } from '@nestjs/common';
import { AppConfigService } from './appConfig/AppConfigService';
import { AuthenticationModule } from './auth/auth.module';

@Module({
  imports: [AuthenticationModule],
  providers: [AppConfigService],
  exports: [AppConfigService, AuthenticationModule],
})
export class InfrastructureServicesModule {}
