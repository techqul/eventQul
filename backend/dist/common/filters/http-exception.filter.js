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
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const response_interface_1 = require("../interfaces/response.interface");
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    configService;
    logger = new common_1.Logger(HttpExceptionFilter_1.name);
    constructor(configService) {
        this.configService = configService;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException ? exception.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof common_1.HttpException ? exception.message : 'Internal server error';
        const isDevelopment = this.configService.get('NODE_ENV') === 'development';
        this.logger.error(`${request.method} ${request.url} - Status: ${status} - Message: ${message}`, exception instanceof Error && !isDevelopment ? exception.stack : '');
        const errorResponse = (0, response_interface_1.createErrorResponse)(message, status);
        if (exception instanceof common_1.HttpException) {
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                if (Array.isArray(exceptionResponse.errors) && exceptionResponse.errors.length > 0) {
                    errorResponse.errors = exceptionResponse.errors;
                    errorResponse.message = exceptionResponse.errors[0].message;
                }
                else if (Array.isArray(exceptionResponse.message) && exceptionResponse.message.length > 0) {
                    errorResponse.errors = exceptionResponse.message.map((msg) => {
                        const [field, ...messageParts] = msg.split(' ');
                        return {
                            field,
                            message: messageParts.join(' '),
                        };
                    });
                    errorResponse.message = exceptionResponse.message[0];
                }
            }
        }
        if (isDevelopment && exception instanceof Error) {
            errorResponse.stack = exception.stack;
        }
        response.status(status).json(errorResponse);
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map