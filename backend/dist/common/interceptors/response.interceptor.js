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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const operators_1 = require("rxjs/operators");
const response_message_decorator_1 = require("../decorators/response-message.decorator");
let ResponseInterceptor = class ResponseInterceptor {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    intercept(context, next) {
        const message = this.reflector.get(response_message_decorator_1.RESPONSE_MESSAGE_KEY, context.getHandler()) || 'Success';
        return next.handle().pipe((0, operators_1.map)((response) => {
            if (response && typeof response === 'object' && 'data' in response && 'total' in response) {
                return {
                    success: true,
                    message,
                    data: response.data,
                    meta: {
                        page: response.page ?? 0,
                        limit: response.size ?? 0,
                        total: response.total,
                        totalPages: Math.ceil(response.total / response.size),
                    },
                };
            }
            return {
                success: true,
                message,
                data: response ?? {},
            };
        }));
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], ResponseInterceptor);
//# sourceMappingURL=response.interceptor.js.map