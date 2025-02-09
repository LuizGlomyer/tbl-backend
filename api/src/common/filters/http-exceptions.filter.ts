import { Catch, HttpException } from '@nestjs/common';
import { ApplicationExceptionFilter } from './application-exception.filter';

@Catch(HttpException)
export class HttpExceptionsFilter extends ApplicationExceptionFilter {
  handleException(exception: HttpException) {
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).message || 'Unknown error';
    const logMessage: string = 'HttpException';

    return { status, message, error: exception.name, logMessage };
  }
}
