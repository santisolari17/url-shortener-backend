# Url-Shortener-Backend

This is the backend app created with [Nest](https://github.com/nestjs/nest) (NodeJs + TypeScript)

## Getting Started

1. Clone this repo

```bash
  git clone https://github.com/santisolari17/url-shortener-backend.git
```

2. Navigate to the project directory

```bash
  cd url-shortener-backend
```

2. Create a .env file

```
  JWT_SECRET_KEY= # Any Secret Key string
  JWT_TOKEN_EXPIRATION_SECS= # Time in Seconds
  ENVIRONMENT= # LOCAL | QA | PRODUCTION
  PORT= # Server port

  # AWS
  AWS_REGION= # The region of your AWS services
  AWS_ACCESS_KEY_ID= # AWS Access Key
  AWS_SECRET_ACCESS_KEY= # AWS Secret Access Key

  # AWS DYNAMO DB
  AWS_DYNAMODB_TABLE_NAME= # The table name for short urls storage
  AWS_DYNAMODB_REGION= # AWS DynamoDB region
  AWS_DYNAMODB_ENDPOINT_URL= # Set another URL for local development

  # API CREDENTIALS
  CREDENTIALS_CLIENT_ID_FRONTEND= # Username
  CREDENTIALS_CLIENT_SECRET_FRONTEND= # User Password
```

3. Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Build

1. Run de build command

```bash
  npm run build
```

## Build and run as a Docker image

1. Build the Docker image

```bash
  docker build -t <your-image-name> .
```

2. Start the container

```bash
  docker run -p <your-host-port>:3000 <your-image-name>
```
