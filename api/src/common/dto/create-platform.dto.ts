import { IsString, MaxLength, ValidateNested } from 'class-validator';
import { NAME_MAX_LENGTH } from '../../db/helpers';
import { CreateMediaDTO } from './create-media.dto';
import { Type } from 'class-transformer';

export class CreatePlatformDTO {
  @IsString()
  @MaxLength(NAME_MAX_LENGTH)
  manufacturer: string;
}

export class InsertPlatformDTO extends CreatePlatformDTO {
  mediaId: number;
}

export class RequestCreatePlatformDTO {
  @ValidateNested()
  @Type(() => CreateMediaDTO)
  media: CreateMediaDTO;

  @ValidateNested()
  @Type(() => CreatePlatformDTO)
  platforms: CreatePlatformDTO;
}
