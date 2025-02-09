import { Catch } from '@nestjs/common';
import { ApplicationExceptionFilter } from './application-exceptions.filter';

@Catch()
export class DefaultExceptionsFilter extends ApplicationExceptionFilter {
  handleException(exception: unknown) {
    const statusCode = 500;
    const message = 'A server error has ocurred';
    const context: string = 'DefaultExceptionsFilter';
    const hasToLog: boolean = true;

    return { statusCode, message, error: exception, context, hasToLog };
  }
}
