import { applyDecorators } from '@nestjs/common';
import { IsInt, Max, Min, ValidationOptions } from 'class-validator';

const MAX_POSITIVE_INT = 2_147_483_647;

export function IsSafeIntId(
  min = 1,
  max = MAX_POSITIVE_INT,
  validationOptions?: ValidationOptions,
) {
  return applyDecorators(
    IsInt(validationOptions),
    Min(min, validationOptions),
    Max(max, validationOptions),
  );
}
