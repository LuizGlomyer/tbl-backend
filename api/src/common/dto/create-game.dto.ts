import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { IsSafeIntId } from '../decorators/validators';
import { CreateMediaDTO } from './create-media.dto';

export class CreateGameDTO {
  @IsSafeIntId()
  platformId: number;
}

export class RequestCreateGameDTO {
  @ValidateNested()
  @Type(() => CreateMediaDTO)
  media: CreateMediaDTO;

  @ValidateNested()
  @Type(() => CreateGameDTO)
  games: CreateGameDTO;
}

export class InsertGameDTO extends CreateGameDTO {
  mediaId: number;
}
