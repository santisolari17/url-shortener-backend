import { IsUrl } from 'class-validator';

export class CreateUrlshortDto {
  @IsUrl({}, { message: 'The provided Url is not a valid Url address.' })
  longUrl: string;
}
