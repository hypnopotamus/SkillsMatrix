import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, HealthCheckResult, HealthIndicatorResult } from '@nestjs/terminus';

const healthy: HealthIndicatorResult = {};

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService
    ) { }

    @Get()
    @HealthCheck()
    check(): Promise<HealthCheckResult> {
        return this.health.check([
            () => healthy,
        ]);
    }
}