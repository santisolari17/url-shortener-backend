import { Inject, Injectable } from '@nestjs/common';
import { AppConfigService } from '../../../infrastructure/services/appConfig/AppConfigService';
import { INosqlStore, I_NOSQL_STORE } from 'src/infrastructure/modules/noSqlStore/interfaces/INoSqlStore';
import { ShortUrl } from 'src/domain/entities/ShortUrl.entity';
import { IncreaseClickAppEvent } from 'src/domain/entities/IncreaseClickEvent.entity';

@Injectable()
export class AppEventsService {
  constructor(
    private readonly _config: AppConfigService,
    @Inject(I_NOSQL_STORE) private readonly _noSqlStore: INosqlStore,
  ) {}

  public async saveIncreaseClickCountEvent(urlReference: ShortUrl): Promise<void> {
    const increaseClickEvent = new IncreaseClickAppEvent({
      eventReferenceId: urlReference.urlId,
      eventTableReference: this._config.config.dynamoDb.tableName,
      eventTablePropertyReference: 'urlId',
      lastVisited: urlReference.lastVisited,
    });
    await this._noSqlStore.put(this._config.config.dynamoDb.eventsTableName, { ...increaseClickEvent });
  }
}
