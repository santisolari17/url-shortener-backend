import { Injectable } from '@nestjs/common';
import { UrlShortenerService } from 'src/domain/services/UrlShortenerService/UrlShortener.service';

@Injectable()
export class GetShortUrlByLongUrlUseCase {
  constructor(private readonly _service: UrlShortenerService) {}

  public async exec(longUrl: string): Promise<any> {
    return await this._service.getShortUrlByLongUrl(longUrl);
  }
}
