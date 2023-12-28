import { Injectable } from '@nestjs/common';
import { ShortUrl } from 'src/domain/entities/ShortUrl.entity';
import { UrlShortenerService } from 'src/domain/services/UrlShortenerService/UrlShortener.service';

@Injectable()
export class GetUrlShortenedListUseCase {
  constructor(private readonly _service: UrlShortenerService) {}

  public async exec(): Promise<ShortUrl[]> {
    return await this._service.getAllShortenedUrls();
  }
}
