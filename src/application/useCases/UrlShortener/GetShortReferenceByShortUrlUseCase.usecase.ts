import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UrlShortenerService } from 'src/domain/services/UrlShortenerService/UrlShortener.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortid = require('shortid');

@Injectable()
export class GetShortUrlByIdUseCase {
  constructor(private readonly _service: UrlShortenerService) {}

  public async exec(urlId: string): Promise<any> {
    if (!shortid.isValid(urlId)) {
      throw new HttpException(`The short url provided has an invalid id. ${urlId}`, HttpStatus.BAD_REQUEST);
    }

    const urlReference = await this._service.getShortUrlReference(urlId);

    if (!urlReference) {
      throw new NotFoundException(`Url with id ${urlId} not found`);
    }

    return urlReference;
  }
}
