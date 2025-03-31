import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../../modules/logger/logger.service';

export abstract class ApplicationExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  abstract handleException(exception: unknown): {
    statusCode: number;
    message: string;
    error: string | any;
    context?: string;
    hasToLog: boolean;
  };

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const requestId = request.headers['x-request-id'] as string;
    const traceId = request.headers['x-trace-id'] as string;
    const requestTimestamp = request.headers['x-request-timestamp'];

    const { statusCode, message, error, context, hasToLog } =
      this.handleException(exception);

    console.error(exception);
    if (hasToLog)
      this.loggerService.error({
        timestamp: new Date(),
        message: `An exception has ocurred: ${message}`,
        context,
        request_id: requestId,
        trace_id: traceId,
        method: request.method,
        url: request.url,
        error_stack: {
          ...exception,
          message: exception.message,
          name: exception.name,
          stack: exception.stack,
        },
      });

    const errorResponse = {
      requestId,
      traceId,
      requestTimestamp,
      responseTimestamp: new Date().toISOString(),
      statusCode,
      message,
      error,
    };

    response.status(statusCode).json(errorResponse);
  }
}
