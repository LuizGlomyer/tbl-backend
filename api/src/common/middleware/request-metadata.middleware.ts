import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

@Injectable()
export class RequestMetadataMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.headers['x-request-id'] = randomUUID();
    req.headers['x-trace-id'] = req.headers['x-trace-id'] || randomUUID();
    req.headers['x-request-timestamp'] = new Date().toISOString();
    next();
  }
}

export default RequestMetadataMiddleware;
