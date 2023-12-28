import { Module } from '@nestjs/common';
import { InfrastructureModulesModule } from './modules/infrastructureModules.module';
import { InfrastructureServicesModule } from './services/infrastructureServices.module';

@Module({
  imports: [InfrastructureModulesModule, InfrastructureServicesModule],
  exports: [InfrastructureModulesModule, InfrastructureServicesModule],
})
export class InfrastructureModule {}
