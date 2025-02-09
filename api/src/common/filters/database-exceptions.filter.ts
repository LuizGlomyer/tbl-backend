import { Catch } from '@nestjs/common';
import { ApplicationExceptionFilter } from './application-exception.filter';
import { DatabaseError } from 'pg';

@Catch(DatabaseError)
export class DatabaseExceptionsFilter extends ApplicationExceptionFilter {
  handleException(exception: DatabaseError) {
    const status = 500;
    const message = exception.detail;
    const error = 'Database Error';
    const logMessage: string = 'DatabaseError';

    return { status, message, error, logMessage };
  }
}
