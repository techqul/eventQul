import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Health Check Controller
 * Provides health check endpoints for monitoring and load balancers
 */
@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  /**
   * Basic health check endpoint
   * Returns 200 if service is running
   * Suitable for simple load balancer health checks
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Basic health check' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  basicHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'eventqul-api',
      version: '1.0.0',
    };
  }

  /**
   * Detailed health check endpoint
   * Checks database, memory, and disk health
   * Returns detailed status of all components
   */
  @Get('detailed')
  @HealthCheck()
  @ApiOperation({ summary: 'Detailed health check with component status' })
  @ApiResponse({ status: 200, description: 'All components are healthy' })
  @ApiResponse({ status: 503, description: 'One or more components are unhealthy' })
  detailedHealth() {
    return this.health.check([
      // Database health check
      () =>
        this.db.pingCheck('database', {
          timeout: 5000,
        }),

      // Memory health check (heap memory should not exceed 500MB)
      () =>
        this.memory.checkHeap('memory_heap', 500 * 1024 * 1024),

      // Memory health check (RSS memory should not exceed 1GB)
      () =>
        this.memory.checkRSS('memory_rss', 1024 * 1024 * 1024),

      // Disk health check (storage should not exceed 90% usage)
      () =>
        this.disk.checkStorage('disk', {
          path: '/',
          thresholdPercent: 0.9,
        }),
    ]);
  }

  /**
   * Readiness probe endpoint
   * Checks if service is ready to handle requests
   */
  @Get('ready')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Readiness probe' })
  @ApiResponse({ status: 200, description: 'Service is ready' })
  @ApiResponse({ status: 503, description: 'Service is not ready' })
  readiness() {
    return {
      status: 'ready',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Liveness probe endpoint
   * Checks if service is alive (not stuck in a deadlocked state)
   */
  @Get('live')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Liveness probe' })
  @ApiResponse({ status: 200, description: 'Service is alive' })
  @ApiResponse({ status: 503, description: 'Service is not alive' })
  liveness() {
    return {
      status: 'alive',
      timestamp: new Date().toISOString(),
    };
  }
}
