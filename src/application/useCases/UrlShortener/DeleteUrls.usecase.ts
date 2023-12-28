import { Injectable } from '@nestjs/common';
import { UrlShortenerService } from 'src/domain/services/UrlShortenerService/UrlShortener.service';

@Injectable()
export class DeleteUrlsUseCase {
  constructor(private readonly _service: UrlShortenerService) {}

  public async exec(urlIds: string[]): Promise<any> {
    return await this._service.deleteUrls(urlIds);
  }
}
