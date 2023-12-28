import { IsDateString, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { AppDateUtils } from 'src/infrastructure/utils/AppDateUtils/AppDateUtils';

type ShortUrlProps = {
  urlId: string;
  longUrl: string;
  createdAt?: string;
  clicks?: number;
  lastVisited?: string;
};

export class ShortUrl {
  @IsString()
  urlId: string;

  @IsUrl()
  longUrl: string;

  @IsDateString()
  createdAt: string;

  @IsNumber()
  clicks: number;

  @IsOptional()
  @IsDateString()
  lastVisited?: string;

  constructor(props: ShortUrlProps) {
    const createdAt = props.createdAt || AppDateUtils.now().toISOString();

    this.urlId = props.urlId;
    this.longUrl = props.longUrl;
    this.createdAt = createdAt;
    this.clicks = props.clicks || 0;
    this.lastVisited = props.lastVisited;
  }
}
