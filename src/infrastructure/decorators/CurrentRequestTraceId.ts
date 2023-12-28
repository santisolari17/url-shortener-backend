import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_TRACE_ID_HEADER } from '../middlewares/requestTracer.middleware';

/**
 * Param Decorator:
 * Sets to a defined controller method param the value of the current trace id
 * @example controllerMehtod(@CurrentRequestTraceId() traceId: string) {}
 */
export const CurrentRequestTraceId = createParamDecorator((data: never, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request[REQUEST_TRACE_ID_HEADER];
});
