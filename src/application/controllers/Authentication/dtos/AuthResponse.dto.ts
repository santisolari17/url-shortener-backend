import { IsJWT } from 'class-validator';

export class AuthResponseDto {
  @IsJWT()
  access_token: string;
}
