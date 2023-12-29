import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../../../../infrastructure/services/appConfig/AppConfigService';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as AWS from 'aws-sdk';
import { INosqlStore } from '../interfaces/INoSqlStore';
import { EAppEnvironment } from 'src/infrastructure/enums/EAppEnvironment';
import { QueryPropertyFilter } from '../types/QueryPropertyFilter.type';

@Injectable()
export class AwsDynamoDb implements INosqlStore {
  private readonly _client: () => DocumentClient;

  constructor(private readonly _config: AppConfigService) {
    const dynamoDBClient = (): DocumentClient => {
      if (this._config.config.environment !== EAppEnvironment.Local) {
        AWS.config.update({
          credentials: {
            accessKeyId: this._config.config.awsCredentials.accessKeyId,
            secretAccessKey: this._config.config.awsCredentials.secretAccessKey,
          },
          region: this._config.config.awsCredentials.region,
        });
      }

      return new AWS.DynamoDB.DocumentClient({
        region:
          this._config.config.environment === EAppEnvironment.Local ? 'local' : this._config.config.dynamoDb.region,
        endpoint:
          this._config.config.environment === EAppEnvironment.Local ? this._config.config.dynamoDb.endpoint : undefined,
      });
    };

    this._client = dynamoDBClient;
  }

  public async put<T>(collection: string, data: T): Promise<void> {
    await this._client()
      .put({
        TableName: collection,
        Item: data,
      })
      .promise();
  }

  public async getAll(collection: string): Promise<any> {
    let result;

    try {
      result = await this._client().scan({ TableName: collection }).promise();
      return result.Items;
    } catch (error) {
      throw new Error(`Error getall -> ${error.message}`);
    }
  }

  public async findOne(collection: string, id: string): Promise<any> {
    const result = await this._client()
      .get({
        TableName: collection,
        Key: { urlId: id },
      })
      .promise();

    return result.Item;
  }

  public async findBy(collection: string, filter: QueryPropertyFilter): Promise<any> {
    const result = await this._client()
      .query({
        TableName: collection,
        IndexName: filter.propertyIndexName || undefined,
        KeyConditionExpression: `${filter.property} ${filter.queryOperator} :val`,
        ExpressionAttributeValues: {
          ':val': filter.value,
        },
      })
      .promise();

    return result.Items[0];
  }

  public async delete(collection: string, ids: string[]): Promise<any> {
    const promises = ids.map(itemId => {
      const params = {
        TableName: collection,
        Key: {
          urlId: itemId,
        },
      };

      return this._client().delete(params).promise();
    });

    try {
      await Promise.all(promises);
    } catch (error) {
      throw new Error(`There was an error deleting the urls: ${error.message}`);
    }
  }
}
