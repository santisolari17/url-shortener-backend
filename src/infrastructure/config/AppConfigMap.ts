import { CLASS_VALIDATOR_CURRENT_MODULE_PROVIDER } from '../modules/classEntityValidator/classEntityValidator.module';
import { AppConfigModel } from './AppConfigModel';

const _entityValidator = new CLASS_VALIDATOR_CURRENT_MODULE_PROVIDER.useClass();

export default async () => {
  const configMapp = {
    port: Number(process.env.PORT),
    environment: process.env.ENVIRONMENT,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtTokenExpirationSecs: process.env.JWT_TOKEN_EXPIRATION_SECS,
    clientCredentials: [
      {
        clientId: process.env.CREDENTIALS_CLIENT_ID_FRONTEND,
        clientSecret: process.env.CREDENTIALS_CLIENT_SECRET_FRONTEND,
      },
    ],
    awsCredentials: {
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    dynamoDb: {
      region: process.env.AWS_DYNAMODB_REGION,
      endpoint: process.env.AWS_DYNAMODB_ENDPOINT_URL,
      tableName: process.env.AWS_DYNAMODB_TABLE_NAME,
      eventsTableName: process.env.AWS_DYNAMODB_EVENTS_TABLE_NAME,
    },
  };

  const appConfig = new AppConfigModel(configMapp);
  await _entityValidator.validate(appConfig);

  return { appConfig };
};
