import { Inject, Injectable } from '@nestjs/common';
import { AppConfigService } from '../../../infrastructure/services/appConfig/AppConfigService';
import { INosqlStore, I_NOSQL_STORE } from 'src/infrastructure/modules/noSqlStore/interfaces/INoSqlStore';
import { ShortUrl } from 'src/domain/entities/ShortUrl.entity';
import { ValidateEntityParams } from '../../../infrastructure/decorators/ValidateEntityParam';

@Injectable()
export class UrlShortenerService {
  constructor(
    private readonly _config: AppConfigService,
    @Inject(I_NOSQL_STORE) private readonly _noSqlStore: INosqlStore,
  ) {}

  @ValidateEntityParams()
  public async saveUrlReference(urlReference: ShortUrl): Promise<void> {
    await this._noSqlStore.put(this._config.config.dynamoDb.tableName, urlReference);
  }

  public async getAllShortenedUrls(): Promise<ShortUrl[]> {
    return await this._noSqlStore.getAll(this._config.config.dynamoDb.tableName);
  }

  public async getShortUrlByLongUrl(longUrl: string): Promise<ShortUrl | null> {
    return await this._noSqlStore.findByPropertyEquality(this._config.config.dynamoDb.tableName, 'longUrl', longUrl);
  }

  public async getShortUrlReference(urlId: string): Promise<ShortUrl> {
    return await this._noSqlStore.findOne(this._config.config.dynamoDb.tableName, urlId);
  }

  public async deleteUrls(urlIds: string[]): Promise<void> {
    await this._noSqlStore.delete(this._config.config.dynamoDb.tableName, urlIds);
  }
}
