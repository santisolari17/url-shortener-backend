import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PinoLogger } from 'nestjs-pino';
import AppConfigMap from '../../../../infrastructure/config/AppConfigMap';
import { AppConfigService } from '../../../../infrastructure/services/appConfig/AppConfigService';
import { AuthenticationService } from '../../../../infrastructure/services/auth/auth.service';
import { Oauth2ClientCredentialsAuthenticationUsecase } from '../Oauth2ClientCredentialsAuthentication.usecase';

describe('#UseCases Oauth2ClientCredentialsAuthenticationUseCase test suite', () => {
  let useCase: Oauth2ClientCredentialsAuthenticationUsecase;
  let authenticationServiceMock: AuthenticationService;
  let appConfig: AppConfigService;

  beforeAll(async () => {
    authenticationServiceMock = { getJWT: jest.fn() } as any;

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [AppConfigMap],
          envFilePath: '.env',
          isGlobal: true,
        }),
      ],
      providers: [
        AppConfigService,
        Oauth2ClientCredentialsAuthenticationUsecase,
        {
          provide: AuthenticationService,
          useValue: authenticationServiceMock,
        },
        {
          provide: PinoLogger,
          useValue: { info: jest.fn(), setContext: jest.fn(), debug: jest.fn(), warn: jest.fn() },
        },
      ],
    }).compile();

    useCase = module.get(Oauth2ClientCredentialsAuthenticationUsecase);
    appConfig = module.get(AppConfigService);
  });

  it('Should throw and error if the provided credentials are invalid (not defined in env variables)', async () => {
    let err;
    const invalidCredentials = {
      client_id: 'invalid_client_id',
      client_secret: 'invalid_client_secret',
      grant_type: 'client_credentials',
    };

    try {
      await useCase.exec(invalidCredentials);
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
  });

  it('Should call the token get method from the authentication service if the credentials are valid', async () => {
    const validClientId = 'someClientId';
    const validClientSecret = 'someValidClientSecret';
    appConfig.config.clientCredentials.push({
      clientId: validClientId,
      clientSecret: validClientSecret,
    });
    const validCredentials = {
      client_id: validClientId,
      client_secret: validClientSecret,
      grant_type: 'client_credentials',
    };

    await useCase.exec(validCredentials);

    expect(authenticationServiceMock.getJWT).toHaveBeenCalled();
  });

  it('Should return the response token from the authentication service as a "access_token" property in the response', async () => {
    const validClientId = 'someClientId';
    const validClientSecret = 'someValidClientSecret';
    appConfig.config.clientCredentials.push({
      clientId: validClientId,
      clientSecret: validClientSecret,
    });
    const validCredentials = {
      client_id: validClientId,
      client_secret: validClientSecret,
      grant_type: 'client_credentials',
    };
    const mockToken = 'somejwtmockstring';
    const expectedResponse = { access_token: mockToken };
    authenticationServiceMock.getJWT = jest.fn().mockReturnValueOnce(expectedResponse);

    const response = await useCase.exec(validCredentials);

    expect(response).toEqual(expectedResponse);
  });
});
