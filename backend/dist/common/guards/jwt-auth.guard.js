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
var JwtAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../../config/jwt.config");
const skip_auth_decorator_1 = require("../decorators/skip-auth.decorator");
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard {
    jwtService;
    reflector;
    logger = new common_1.Logger(JwtAuthGuard_1.name);
    constructor(jwtService, reflector) {
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const skipAuth = this.reflector.getAllAndOverride(skip_auth_decorator_1.SKIP_AUTH_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (skipAuth) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException('Access token is missing');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwt_config_1.jwtConfig.secret,
            });
            request['user'] = {
                sub: payload.sub,
                id: payload.sub,
                email: payload.email,
                role: payload.role,
                firstName: payload.firstName,
                lastName: payload.lastName,
                iat: payload.iat,
                exp: payload.exp,
            };
            return true;
        }
        catch (error) {
            this.logger.error(`JWT verification failed: ${error.message}`);
            if (error.name === 'TokenExpiredError') {
                throw new common_1.UnauthorizedException('Access token has expired');
            }
            if (error.name === 'JsonWebTokenError') {
                throw new common_1.UnauthorizedException('Invalid access token');
            }
            throw new common_1.UnauthorizedException('Authentication failed');
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        core_1.Reflector])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map