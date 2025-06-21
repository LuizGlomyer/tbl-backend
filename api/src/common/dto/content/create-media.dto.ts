import { IsArray, IsString, MaxLength } from 'class-validator';
import {
  GENERIC_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from '../../constants/database.constants';

export class CreateMediaDTO {
  @IsString()
  @MaxLength(NAME_MAX_LENGTH)
  name: string;

  @IsString()
  @MaxLength(GENERIC_MAX_LENGTH)
  acronym: string;

  @IsString()
  description: string;

  @IsString()
  imageCoverUrl: string;

  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];
}

export class InsertMediaDTO extends CreateMediaDTO {
  type: string;
}
