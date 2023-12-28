import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { EAppEnvironment } from '../enums/EAppEnvironment';
import { DynamoDbConfig } from './models/DynamoDb.config';
import { ClientCredentials } from './models/ClientCredentials.config';
import { IOAuth2ClientCredentials } from '../interfaces/IOAuth2ClientCredentials';
import { AwsCredentialsConfig } from './models/AwsCredentials.config';

export class AppConfigModel {
  @IsNumber()
  port: number;

  @IsEnum(EAppEnvironment)
  environment: EAppEnvironment;

  @IsString()
  jwtSecretKey: string;

  @IsNumber()
  jwtTokenExpirationSecs: number;

  @ValidateNested({ each: true })
  clientCredentials: ClientCredentials[];

  @ValidateNested()
  awsCredentials: AwsCredentialsConfig;

  @ValidateNested()
  dynamoDb: DynamoDbConfig;

  constructor(config: any) {
    this.port = config.port;
    this.environment = config.environment;
    this.jwtSecretKey = config.jwtSecretKey;
    this.jwtTokenExpirationSecs = Number(config.jwtTokenExpirationSecs);
    this.awsCredentials = new AwsCredentialsConfig(config.awsCredentials);
    this.dynamoDb = new DynamoDbConfig(config.dynamoDb);

    this._mapClientCredentials(config.clientCredentials);
  }

  private _mapClientCredentials(clientCredentials: IOAuth2ClientCredentials[]) {
    this.clientCredentials = [];

    for (const client of clientCredentials) {
      this.clientCredentials.push(new ClientCredentials(client));
    }
  }
}
