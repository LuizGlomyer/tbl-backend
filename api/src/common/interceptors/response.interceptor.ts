import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => ({
        requestId: request.headers['x-request-id'],
        traceId: request.headers['x-trace-id'],
        requestTimestamp: request.headers['x-request-timestamp'],
        responseTimestamp: new Date().toISOString(),
        status: response.statusCode,
        payload: data ?? {},
      })),
    );
  }
}
