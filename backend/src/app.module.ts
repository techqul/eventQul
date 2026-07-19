import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { dataSourceOptions } from './config/database.config';
import { redisOptions, RedisTTL } from './config/redis.config';
import { HealthModule } from './health/health.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

/**
 * Global Configuration Module
 * Provides configuration to all modules
 */
@Global()
@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      cache: true,
    }),

    // Database (TypeORM)
    TypeOrmModule.forRoot(dataSourceOptions),

    // Cache (Redis)
    CacheModule.register({
      isGlobal: true,
      store: redisStore as any,
      ttl: RedisTTL.CACHE,
      ...redisOptions,
    }),

    // Rate Limiting
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60000,
        limit: 100,
      },
      {
        name: 'strict',
        ttl: 60000,
        limit: 20,
      },
    ]),

    // Feature Modules
    HealthModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useFactory: (reflector: Reflector) => new ResponseInterceptor(reflector),
      inject: [Reflector],
    },
  ],
})
export class AppModule {}
