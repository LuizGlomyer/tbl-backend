import { BadRequestException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';

export const formatValidationErrors = (errors: ValidationError[]): string[] => {
  return errors.flatMap((error) => {
    if (error.constraints) {
      return Object.values(error.constraints);
    }

    // For nested validation
    if (error.children && error.children.length > 0) {
      return formatValidationErrors(error.children);
    }

    return [];
  });
};

export const validateDto = async <T extends object>(dto: T) => {
  const errors = await validate(dto);
  if (errors.length > 0) {
    const formattedErrors = formatValidationErrors(errors);
    throw new BadRequestException(formattedErrors);
  }
};
