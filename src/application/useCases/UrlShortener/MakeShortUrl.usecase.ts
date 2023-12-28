import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ShortUrl } from 'src/domain/entities/ShortUrl.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortid = require('shortid');
import { UrlShortenerService } from 'src/domain/services/UrlShortenerService/UrlShortener.service';

@Injectable()
export class MakeShortUrlUseCase {
  constructor(private readonly _service: UrlShortenerService) {}

  public async exec(longUrl: string): Promise<any> {
    const urlId = shortid.generate();

    const shortUrl = new ShortUrl({ urlId, longUrl });

    const alreadyExistentShortUrl = await this._service.getShortUrlByLongUrl(longUrl);

    if (alreadyExistentShortUrl) {
      throw new HttpException(
        `The url has already been shortener. Id: ${alreadyExistentShortUrl.urlId} `,
        HttpStatus.CONFLICT,
      );
    }

    await this._service.saveUrlReference(shortUrl);

    return shortUrl;
  }
}
