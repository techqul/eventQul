"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var HttpCacheInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCacheInterceptor = exports.CACHE_TTL = exports.CACHE_KEY = void 0;
exports.CacheKey = CacheKey;
exports.CacheTTL = CacheTTL;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cache_manager_1 = require("@nestjs/cache-manager");
const cache_manager_2 = require("@nestjs/cache-manager");
const cache_manager_3 = require("@nestjs/cache-manager");
exports.CACHE_KEY = 'cacheKey';
exports.CACHE_TTL = 'cacheTTL';
function CacheKey(key) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(exports.CACHE_KEY, key, descriptor.value);
    };
}
function CacheTTL(ttl) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(exports.CACHE_TTL, ttl, descriptor.value);
    };
}
let HttpCacheInterceptor = HttpCacheInterceptor_1 = class HttpCacheInterceptor extends cache_manager_1.CacheInterceptor {
    cacheManager;
    reflector;
    logger = new common_1.Logger(HttpCacheInterceptor_1.name);
    constructor(cacheManager, reflector) {
        super(cacheManager, reflector);
        this.cacheManager = cacheManager;
        this.reflector = reflector;
    }
    generateCacheKey(context, trackingId) {
        const customKey = this.reflector.get(exports.CACHE_KEY, context.getHandler());
        if (customKey) {
            return `${customKey}:${trackingId || ''}`;
        }
        const request = context.switchToHttp().getRequest();
        const route = request.route?.path || request.url;
        const query = JSON.stringify(request.query);
        const userId = request.user?.id || 'anonymous';
        return `http:${route}:${query}:${userId}`;
    }
    async isRequestCachable(context) {
        const request = context.switchToHttp().getRequest();
        if (!['GET', 'HEAD'].includes(request.method)) {
            return false;
        }
        const isPublic = this.reflector.get('skipAuth', context.getHandler());
        const noCache = this.reflector.get('noCache', context.getHandler());
        if (noCache) {
            return false;
        }
        return true;
    }
};
exports.HttpCacheInterceptor = HttpCacheInterceptor;
exports.HttpCacheInterceptor = HttpCacheInterceptor = HttpCacheInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_2.CACHE_MANAGER)),
    __metadata("design:paramtypes", [cache_manager_3.Cache,
        core_1.Reflector])
], HttpCacheInterceptor);
//# sourceMappingURL=cache.interceptor.js.map