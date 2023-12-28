import { IsString } from 'class-validator';

export class FindShortUrlDto {
  @IsString({ message: 'The provided Url is not a valid string.' })
  urlId: string;
}
