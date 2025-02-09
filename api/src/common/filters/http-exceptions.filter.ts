import { Catch, HttpException } from '@nestjs/common';
import { ApplicationExceptionFilter } from './application-exceptions.filter';

@Catch(HttpException)
export class HttpExceptionsFilter extends ApplicationExceptionFilter {
  handleException(exception: HttpException) {
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).message || 'Unknown error';
    const context: string = 'HttpExceptionsFilter';
    const hasToLog: boolean = false;

    return { statusCode, message, error: exception.name, context, hasToLog };
  }
}
