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
var TransformInterceptor_1, ExcludeFieldsInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcludeFieldsInterceptor = exports.TransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const core_1 = require("@nestjs/core");
let TransformInterceptor = TransformInterceptor_1 = class TransformInterceptor {
    reflector;
    logger = new common_1.Logger(TransformInterceptor_1.name);
    constructor(reflector) {
        this.reflector = reflector;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const statusCode = context.switchToHttp().getResponse().statusCode;
        return next.handle().pipe((0, operators_1.map)((data) => {
            if (data && typeof data === 'object' && 'success' in data) {
                return data;
            }
            const response = {
                success: true,
                message: data?.message || undefined,
                data: data?.data !== undefined ? data.data : data,
                meta: data?.meta || this.extractMeta(data, request),
            };
            if (!data?.message) {
                delete response.message;
            }
            if (process.env.NODE_ENV === 'development') {
                this.logger.log(`${request.method} ${request.url} - Status: ${statusCode}`);
            }
            return response;
        }));
    }
    extractMeta(data, request) {
        if (!data)
            return undefined;
        if (data.meta) {
            return data.meta;
        }
        if (data.page !== undefined || data.limit !== undefined || data.total !== undefined) {
            const page = data.page || 1;
            const limit = data.limit || 20;
            const total = data.total || 0;
            const totalPages = Math.ceil(total / limit);
            return {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrevious: page > 1,
            };
        }
        return undefined;
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = TransformInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [core_1.Reflector])
], TransformInterceptor);
let ExcludeFieldsInterceptor = ExcludeFieldsInterceptor_1 = class ExcludeFieldsInterceptor {
    logger = new common_1.Logger(ExcludeFieldsInterceptor_1.name);
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            if (!data || typeof data !== 'object') {
                return data;
            }
            return this.excludeSensitiveFields(data);
        }));
    }
    excludeSensitiveFields(obj) {
        if (!obj)
            return obj;
        const sensitiveFields = ['passwordHash', 'password', 'currentHashedRefreshToken'];
        if (Array.isArray(obj)) {
            return obj.map((item) => this.excludeSensitiveFields(item));
        }
        const result = { ...obj };
        for (const field of sensitiveFields) {
            if (field in result) {
                delete result[field];
            }
        }
        for (const key in result) {
            if (result[key] && typeof result[key] === 'object') {
                result[key] = this.excludeSensitiveFields(result[key]);
            }
        }
        return result;
    }
};
exports.ExcludeFieldsInterceptor = ExcludeFieldsInterceptor;
exports.ExcludeFieldsInterceptor = ExcludeFieldsInterceptor = ExcludeFieldsInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], ExcludeFieldsInterceptor);
//# sourceMappingURL=transform.interceptor.js.map