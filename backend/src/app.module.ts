import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import * as redisStore from 'cache-manager-redis-store';
import { dataSourceOptions } from './config/database.config';
import { redisOptions, RedisTTL } from './config/redis.config';
import { HealthModule } from './health/health.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
 * Global Configuration Module
 * Provides configuration to all modules
 */
@Global()
@Module({
  imports: [
    // ============================================================================
    // Configuration
    // ============================================================================
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      cache: true,
    }),

    // ============================================================================
    // Database (TypeORM)
    // ============================================================================
    TypeOrmModule.forRoot(dataSourceOptions),

    // ============================================================================
    // Cache (Redis)
    // ============================================================================
    CacheModule.register({
      isGlobal: true,
      store: redisStore as any,
      ttl: RedisTTL.CACHE,
      ...redisOptions,
    }),

    // ============================================================================
    // Rate Limiting
    // ============================================================================
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60000, // 60 seconds
        limit: 100, // 100 requests per minute
      },
      {
        name: 'strict',
        ttl: 60000,
        limit: 20, // Stricter for sensitive endpoints
      },
    ]),

    // ============================================================================
    // Feature Modules
    // ============================================================================
    HealthModule,
    // More modules will be added in subsequent phases:
    // AuthModule
    // UserModule
    // OrganizerModule
    // CategoryModule
    // VenueModule
    // EventModule
    // OrderModule
    // PaymentModule
    // CouponModule
    // NotificationModule
    // RoleModule
    // PermissionModule
    // DashboardModule
    // AnalyticsModule
    // AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
