import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlShortenerService } from 'src/domain/services/UrlShortenerService/UrlShortener.service';
import { Response } from 'express';
import { AppDateUtils } from 'src/infrastructure/utils/AppDateUtils/AppDateUtils';

@Injectable()
export class RedirectShortUrlUseCase {
  constructor(private readonly _service: UrlShortenerService) {}

  public async exec(urlId: string, res: Response): Promise<any> {
    const urlReference = await this._service.getShortUrlReference(urlId);

    if (!urlReference) {
      throw new NotFoundException('Url not found');
    }

    urlReference.clicks++;
    urlReference.lastVisited = AppDateUtils.now().toISOString();

    await this._service.saveUrlReference(urlReference);

    res.redirect(urlReference.longUrl);
  }
}
