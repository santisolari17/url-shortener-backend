import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly _health: HealthCheckService,
    private readonly _http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this._health.check([() => this._http.pingCheck('Simple health check v1.0.8', 'https://www.google.com/')]);
  }
}
