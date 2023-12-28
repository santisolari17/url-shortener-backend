import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { ClientCredentialDto } from '../../../application/controllers/Authentication/dtos/ClientCredential.dto';
import { ExceptionError } from '../../../infrastructure/errors/ExceptionError/ExceptionError';
import { IOAuth2ClientCredentials } from '../../../infrastructure/interfaces/IOAuth2ClientCredentials';
import { AppConfigService } from '../../../infrastructure/services/appConfig/AppConfigService';
import { AuthenticationService } from '../../../infrastructure/services/auth/auth.service';

@Injectable()
export class Oauth2ClientCredentialsAuthenticationUsecase {
  private readonly _clientCredentials: IOAuth2ClientCredentials[];

  constructor(
    private readonly _authenticationService: AuthenticationService,
    private readonly _config: AppConfigService,
    private readonly _logger: PinoLogger,
  ) {
    this._clientCredentials = this._config.config.clientCredentials;
    this._logger.setContext(Oauth2ClientCredentialsAuthenticationUsecase.name);
  }

  public async exec(credentials: ClientCredentialDto) {
    if (!this._isValidClient(credentials)) {
      throw new ExceptionError('Authorization', 'invalid_client', 'Credentials not valid');
    }

    const payload = { client: credentials.client_id };

    this._logger.info(
      { client: credentials.client_id },
      `client ${credentials.client_id} successfully got credentials`,
    );

    return this._authenticationService.getJWT(payload, true);
  }

  private _isValidClient(credentials: ClientCredentialDto): boolean {
    const foundClient = this._clientCredentials.find(
      c => c.clientId === credentials.client_id && c.clientSecret === credentials.client_secret,
    );
    return !!foundClient;
  }
}
