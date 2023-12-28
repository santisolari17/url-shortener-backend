import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { Oauth2ClientCredentialsAuthenticationUsecase } from 'src/application/useCases/Authentication/Oauth2ClientCredentialsAuthentication.usecase';
import { AuthResponseDto } from './dtos/AuthResponse.dto';
import { ClientCredentialDto } from './dtos/ClientCredential.dto';

@Controller('authenticate')
export class AuthenticationController {
  constructor(private readonly _oauth2Authorization: Oauth2ClientCredentialsAuthenticationUsecase) {}

  @Post()
  async authenticateUser(@Body() body: ClientCredentialDto): Promise<AuthResponseDto> {
    let token;

    try {
      token = await this._oauth2Authorization.exec(body);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return token;
  }
}
