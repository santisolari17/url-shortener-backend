import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';

export const REQUEST_TRACE_ID_HEADER = 'X-Request-Trace-Id';

@Injectable()
export class RequestTracerMiddleware implements NestMiddleware {
  constructor(private readonly _logger: PinoLogger) {
    this._logger.setContext(RequestTracerMiddleware.name);
  }

  use(req: Request, res: Response, next: NextFunction) {
    const traceId = uuidv4();

    req[REQUEST_TRACE_ID_HEADER] = traceId;
    res.set(REQUEST_TRACE_ID_HEADER, traceId);

    const isRequestingHealth = req.url === '/' && req.method === 'GET';

    if (!isRequestingHealth) {
      this._logger.info({
        traceId,
        baseUrl: req.baseUrl,
        url: req.url,
        message: `Received: ${req.method} - ${req.url}`,
      });
    }

    next();
  }
}
