import { Module } from '@nestjs/common';
import { ServicesModule } from '../../domain/services/services.module';
import { Oauth2ClientCredentialsAuthenticationUsecase } from './Authentication/Oauth2ClientCredentialsAuthentication.usecase';
import { MakeShortUrlUseCase } from './UrlShortener/MakeShortUrl.usecase';
import { RedirectShortUrlUseCase } from './UrlShortener/RedirectShortUrl.usecase';
import { GetUrlShortenedListUseCase } from './UrlShortener/GetUrlShortenedList.usecase';
import { DeleteUrlsUseCase } from './UrlShortener/DeleteUrls.usecase';
import { GetShortUrlByIdUseCase } from './UrlShortener/GetShortReferenceByShortUrlUseCase.usecase';

@Module({
  imports: [ServicesModule],
  providers: [
    GetUrlShortenedListUseCase,
    MakeShortUrlUseCase,
    RedirectShortUrlUseCase,
    DeleteUrlsUseCase,
    GetShortUrlByIdUseCase,
    Oauth2ClientCredentialsAuthenticationUsecase,
  ],
  exports: [
    GetUrlShortenedListUseCase,
    MakeShortUrlUseCase,
    RedirectShortUrlUseCase,
    DeleteUrlsUseCase,
    GetShortUrlByIdUseCase,
    Oauth2ClientCredentialsAuthenticationUsecase,
  ],
})
export class UsecasesModule {}
