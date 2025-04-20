import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateMediaDTO } from '../../media/dto/create-media.dto';
import { IsSafeIntId } from '../../../../common/decorators/validators';

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
