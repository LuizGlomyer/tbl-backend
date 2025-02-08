import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DatabaseError } from 'pg';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const requestId = request.headers['x-request-id'];
    const traceId = request.headers['x-trace-id'];
    const requestTimestamp = request.headers['x-request-timestamp'];
    const responseTimestamp = new Date().toISOString();
    const requestBody = request.body;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || message;
    }

    if (exception instanceof DatabaseError) {
      message = exception.detail;
      // TODO log exception object
    }

    const errorResponse = {
      requestId,
      traceId,
      requestTimestamp,
      responseTimestamp,
      status,
      message,
      error: exception instanceof Error ? exception.name : 'UnknownError',
    };

    response.status(status).json(errorResponse);
  }
}
