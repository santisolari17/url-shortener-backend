import { IsString } from 'class-validator';

export class DynamoDbConfig {
  @IsString()
  region: string;

  @IsString()
  endpoint: string;

  @IsString()
  tableName: string;

  @IsString()
  eventsTableName: string;

  constructor(params: any) {
    this.region = params.region;
    this.endpoint = params.endpoint;
    this.tableName = params.tableName;
    this.eventsTableName = params.eventsTableName;
  }
}
