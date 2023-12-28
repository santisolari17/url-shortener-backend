import { IsString, IsUUID } from 'class-validator';
import { IOAuth2ClientCredentials } from 'src/infrastructure/interfaces/IOAuth2ClientCredentials';

export class ClientCredentials implements IOAuth2ClientCredentials {
  @IsString()
  clientId: string;

  @IsUUID()
  clientSecret: string;

  constructor(params: IOAuth2ClientCredentials) {
    this.clientId = params.clientId;
    this.clientSecret = params.clientSecret;
  }
}
