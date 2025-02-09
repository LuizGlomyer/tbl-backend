import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

export abstract class ApplicationExceptionFilter implements ExceptionFilter {
  abstract handleException(exception: unknown): {
    status: number;
    message: string;
    error: string | any;
    logMessage?: string;
  };

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const requestId = request.headers['x-request-id'];
    const traceId = request.headers['x-trace-id'];
    const requestTimestamp = request.headers['x-request-timestamp'];

    const { status, message, error } = this.handleException(exception);

    const errorResponse = {
      requestId,
      traceId,
      requestTimestamp,
      responseTimestamp: new Date().toISOString(),
      status,
      message,
      error,
    };

    response.status(status).json(errorResponse);
  }
}
