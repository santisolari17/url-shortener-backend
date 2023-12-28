import { Module } from '@nestjs/common';
import { AppConfigService } from '../../../infrastructure/services/appConfig/AppConfigService';
import { I_NOSQL_STORE } from './interfaces/INoSqlStore';
import { AwsDynamoDb } from './implementations/AwsDynamoDb';

export const NOSQL_CURRENT_MODULE_PROVIDER = {
  useClass: AwsDynamoDb,
  provide: I_NOSQL_STORE,
};

@Module({
  providers: [NOSQL_CURRENT_MODULE_PROVIDER, AppConfigService],
  exports: [NOSQL_CURRENT_MODULE_PROVIDER],
})
export class NosqlStoreModule {}
