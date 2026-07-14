import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from '@nestjs/cache-manager';
export declare const CACHE_KEY = "cacheKey";
export declare const CACHE_TTL = "cacheTTL";
export declare function CacheKey(key: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function CacheTTL(ttl: number): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare class HttpCacheInterceptor extends CacheInterceptor {
    protected readonly cacheManager: Cache;
    protected readonly reflector: Reflector;
    private readonly logger;
    constructor(cacheManager: Cache, reflector: Reflector);
    protected generateCacheKey(context: ExecutionContext, trackingId?: string): string;
    protected isRequestCachable(context: ExecutionContext): boolean;
}
