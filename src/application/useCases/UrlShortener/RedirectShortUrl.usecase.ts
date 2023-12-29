import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlShortenerService } from 'src/domain/services/UrlShortenerService/UrlShortener.service';
import { Response } from 'express';
import { AppEventsService } from 'src/domain/services/AppEventsService/AppEvents.service';
import { AppDateUtils } from 'src/infrastructure/utils/AppDateUtils/AppDateUtils';

@Injectable()
export class RedirectShortUrlUseCase {
  constructor(
    private readonly _service: UrlShortenerService,
    private readonly _appEventsService: AppEventsService,
  ) {}

  public async exec(urlId: string, res: Response): Promise<any> {
    const urlReference = await this._service.getShortUrlReference(urlId);

    if (!urlReference) {
      throw new NotFoundException('Url not found');
    }

    urlReference.lastVisited = AppDateUtils.now().toISOString();
    await this._appEventsService.saveIncreaseClickCountEvent(urlReference);

    res.redirect(urlReference.longUrl);
  }
}
