import { IsString, MaxLength, ValidateNested } from 'class-validator';
import { NAME_MAX_LENGTH } from '../../../../db/helpers';
import { CreateMediaDTO } from '../../media/dto/create-media.dto';
import { Type } from 'class-transformer';

export class CreatePlatformDTO {
  @IsString()
  @MaxLength(NAME_MAX_LENGTH)
  manufacturer: string;
}

export class InsertPlatformDTO {
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
