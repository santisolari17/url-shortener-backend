import { IsArray, IsString } from 'class-validator';

export class DeleteUrlshortDto {
  @IsArray()
  @IsString({ each: true })
  urlIds: string[];
}
