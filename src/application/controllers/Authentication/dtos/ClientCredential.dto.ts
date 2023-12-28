import { IsString } from 'class-validator';

export class ClientCredentialDto {
  @IsString()
  public client_id: string;

  @IsString()
  public client_secret: string;

  @IsString()
  public grant_type: string;
}
