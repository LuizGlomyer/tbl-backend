import {
  IsBoolean,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { IsSafeIntId } from '../../decorators/validators';
import {
  MAX_INTERVAL_HOURS_DIGITS,
  MAX_TEXT_CHARACTERS,
} from '../../constants/validator.constants';

export class UpdateBacklogDTO {
  @IsSafeIntId()
  statusId: number;

  @IsOptional()
  @Matches(/^(10(\.0{1,2})?|[0-9](\.\d{1,2})?)$/, {
    message: 'Rating must be a number between 0 and 10 with up to 2 decimals',
  })
  rating?: string;

  @IsOptional()
  @IsString()
  @MaxLength(MAX_TEXT_CHARACTERS)
  review?: string;

  @IsOptional()
  @IsBoolean()
  reviewContainsSpoilers?: boolean;

  @IsOptional()
  @IsString()
  personalCommentary?: string;

  @IsOptional()
  @Matches(
    new RegExp(
      `^([0-9]{1,${MAX_INTERVAL_HOURS_DIGITS}}):([0-5][0-9]):([0-5][0-9])$`,
    ),
    {
      message: `timeSpent must be in HH:MM:SS format, with a maximum of ${MAX_INTERVAL_HOURS_DIGITS} digits for hours`,
    },
  )
  timeSpent?: string;
}

export class CreateBacklogDTO extends UpdateBacklogDTO {
  @IsSafeIntId()
  userMediaId: number;
}
