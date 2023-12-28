import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlshortDto } from './create-urlshort.dto';

export class UpdateUrlshortDto extends PartialType(CreateUrlshortDto) {}
