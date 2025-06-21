import { applyDecorators } from '@nestjs/common';
import { IsInt, Max, Min, ValidationOptions } from 'class-validator';
import { DATABASE_MAX_POSITIVE_INT } from '../constants/validator.constants';

export function IsSafeIntId(
  min = 1,
  max = DATABASE_MAX_POSITIVE_INT,
  validationOptions?: ValidationOptions,
) {
  return applyDecorators(
    IsInt(validationOptions),
    Min(min, validationOptions),
    Max(max, validationOptions),
  );
}
