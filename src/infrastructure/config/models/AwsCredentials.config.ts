import { IsString } from 'class-validator';

export class AwsCredentialsConfig {
  @IsString()
  region: string;

  @IsString()
  accessKeyId: string;

  @IsString()
  secretAccessKey: string;

  constructor(params: any) {
    this.region = params.region;
    this.accessKeyId = params.accessKeyId;
    this.secretAccessKey = params.secretAccessKey;
  }
}
