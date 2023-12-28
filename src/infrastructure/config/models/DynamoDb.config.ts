import { IsString } from 'class-validator';

export class DynamoDbConfig {
  @IsString()
  region: string;

  @IsString()
  endpoint: string;

  @IsString()
  tableName: string;

  constructor(params: any) {
    this.region = params.region;
    this.endpoint = params.endpoint;
    this.tableName = params.tableName;
  }
}
