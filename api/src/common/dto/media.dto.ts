import { IsOptional, IsString, MaxLength } from 'class-validator';
import { MAX_PARAM_LENGTH } from '../constants/validator.constants';

export class MediaSearchDTO {
  @IsOptional()
  @IsString()
  @MaxLength(MAX_PARAM_LENGTH)
  search?: string;
}

export class MediaFiltersDTO {
  @IsOptional()
  @IsString()
  @MaxLength(MAX_PARAM_LENGTH)
  type?: string;

  @IsOptional()
  @IsString()
  @MaxLength(MAX_PARAM_LENGTH)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(MAX_PARAM_LENGTH)
  acronym?: string;
}
