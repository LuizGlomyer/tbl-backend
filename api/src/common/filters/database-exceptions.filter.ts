import { Catch } from '@nestjs/common';
import { ApplicationExceptionFilter } from './application-exceptions.filter';
import { DatabaseError } from 'pg';

@Catch(DatabaseError)
export class DatabaseExceptionsFilter extends ApplicationExceptionFilter {
  handleException(exception: DatabaseError) {
    const statusCode = 500;
    const message = `${exception.severity}. Couldn't process the request, try again later`;
    const error = 'Database Error';
    const context: string = 'DatabaseExceptionsFilter';
    const hasToLog: boolean = true;

    return { statusCode, message, error, context, hasToLog };
  }
}
