import { Catch } from '@nestjs/common';
import { ApplicationExceptionFilter } from './application-exception.filter';

@Catch()
export class DefaultExceptionsFilter extends ApplicationExceptionFilter {
  handleException(exception: unknown) {
    const status = 500;
    const message = 'A server error has ocurred';
    const logMessage: string = 'DefaultException';

    return { status, message, error: exception, logMessage };
  }
}
