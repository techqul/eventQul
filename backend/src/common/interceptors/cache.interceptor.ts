import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from '@nestjs/cache-manager';

/**
 * Cache metadata key
 */
export const CACHE_KEY = 'cacheKey';
export const CACHE_TTL = 'cacheTTL';

/**
 * Cache Key Decorator
 * Specifies a custom cache key
 * Usage: @CacheKey('events:list')
 */
export function CacheKey(key: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Reflect.defineMetadata(CACHE_KEY, key, descriptor.value);
  };
}

/**
 * Cache TTL Decorator
 * Specifies custom cache TTL in seconds
 * Usage: @CacheTTL(300) // 5 minutes
 */
export function CacheTTL(ttl: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Reflect.defineMetadata(CACHE_TTL, ttl, descriptor.value);
  };
}

/**
 * Custom Cache Interceptor
 * Extends NestJS CacheInterceptor with custom key generation
 */
@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  private readonly logger = new Logger(HttpCacheInterceptor.name);

  constructor(
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
    protected readonly reflector: Reflector,
  ) {
    super(cacheManager, reflector);
  }

  protected generateCacheKey(
    context: ExecutionContext,
    trackingId?: string,
  ): string {
    // Get custom cache key from decorator
    const customKey = this.reflector.get(CACHE_KEY, context.getHandler());

    if (customKey) {
      return `${customKey}:${trackingId || ''}`;
    }

    // Generate key based on route and query params
    const request = context.switchToHttp().getRequest();
    const route = request.route?.path || request.url;
    const query = JSON.stringify(request.query);
    const userId = request.user?.id || 'anonymous';

    return `http:${route}:${query}:${userId}`;
  }

  protected async isRequestCachable(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Don't cache POST, PUT, DELETE, PATCH requests
    if (!['GET', 'HEAD'].includes(request.method)) {
      return false;
    }

    // Check for @Public() decorator - public endpoints can be cached
    const isPublic = this.reflector.get('skipAuth', context.getHandler());

    // For authenticated requests, we can cache but key will include user ID
    // For public requests, cache is shared across all users

    // Check if caching is explicitly disabled
    const noCache = this.reflector.get('noCache', context.getHandler());
    if (noCache) {
      return false;
    }

    return true;
  }
}
