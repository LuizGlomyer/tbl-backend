import { IsString, MaxLength } from 'class-validator';
import { NAME_MAX_LENGTH } from '../../../../db/helpers';
import { CreateMediaDTO } from '../../media/dto/create-media.dto';

export class CreatePlatformDTO extends CreateMediaDTO {
  @IsString()
  @MaxLength(NAME_MAX_LENGTH)
  manufacturer: string;
}

export class InsertPlatformDTO extends CreatePlatformDTO {
  mediaId: number;
}
