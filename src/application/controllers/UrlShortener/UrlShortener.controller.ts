import { Body, Controller, Delete, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { MakeShortUrlUseCase } from 'src/application/useCases/UrlShortener/MakeShortUrl.usecase';
import { CreateUrlshortDto } from './dtos/create-urlshort.dto';
import { RedirectShortUrlUseCase } from 'src/application/useCases/UrlShortener/RedirectShortUrl.usecase';
import { Response } from 'express';
import { GetUrlShortenedListUseCase } from 'src/application/useCases/UrlShortener/GetUrlShortenedList.usecase';
import { DeleteUrlshortDto } from './dtos/delete-urlshort.dto';
import { DeleteUrlsUseCase } from 'src/application/useCases/UrlShortener/DeleteUrls.usecase';
import { GetShortUrlByIdUseCase } from 'src/application/useCases/UrlShortener/GetShortReferenceByShortUrlUseCase.usecase';
import { FindShortUrlDto } from './dtos/find-shorturl.dto';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwtAuth.guard';

@Controller()
export class UrlshortenerController {
  constructor(
    private readonly _shortenerUseCase: MakeShortUrlUseCase,
    private readonly _redirectUseCase: RedirectShortUrlUseCase,
    private readonly _getListUseCase: GetUrlShortenedListUseCase,
    private readonly _deleteUrlsUseCase: DeleteUrlsUseCase,
    private readonly _getByShortUrl: GetShortUrlByIdUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('urlshort')
  public async getUrlShortenedList() {
    return this._getListUseCase.exec();
  }

  @UseGuards(JwtAuthGuard)
  @Post('urlshort')
  public async shortenUrl(@Body() body: CreateUrlshortDto) {
    return this._shortenerUseCase.exec(body.longUrl);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('urlshort')
  public async deleteUrls(@Body() body: DeleteUrlshortDto) {
    return this._deleteUrlsUseCase.exec(body.urlIds);
  }

  @UseGuards(JwtAuthGuard)
  @Get('urlshort/:urlId')
  public async getShortUrl(@Param() param: FindShortUrlDto) {
    return this._getByShortUrl.exec(param.urlId);
  }

  @Get(':urlId')
  public async redirectShortUrl(@Param() params: any, @Res() res: Response) {
    return this._redirectUseCase.exec(params.urlId, res);
  }
}
