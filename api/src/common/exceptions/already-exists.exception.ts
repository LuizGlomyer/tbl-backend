import { ConflictException } from '@nestjs/common';

export class AlreadyExistsException extends ConflictException {
  constructor(resource: string = 'This resource') {
    super(`${resource} already exists`);
  }
}
