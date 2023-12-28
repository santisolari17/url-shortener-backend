import { Module } from '@nestjs/common';
import { ClassEntityValidatorModule } from './classEntityValidator/classEntityValidator.module';
import { NosqlStoreModule } from './noSqlStore/nosql-store.module';

@Module({
  imports: [NosqlStoreModule, ClassEntityValidatorModule],
  exports: [NosqlStoreModule, ClassEntityValidatorModule],
})
export class InfrastructureModulesModule {}
