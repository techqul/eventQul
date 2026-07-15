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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../users/users.service");
const types_1 = require("../users/types");
let AuthService = AuthService_1 = class AuthService {
    usersService;
    jwtService;
    configService;
    logger = new common_1.Logger(AuthService_1.name);
    refreshTokens = new Map();
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(registerDto) {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new common_1.ConflictException('Email already registered');
        }
        const response = await this.usersService.register(registerDto);
        const user = response.data;
        const tokens = await this.generateTokens(user);
        return {
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                },
                ...tokens,
            },
        };
    }
    async login(loginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await user.validatePassword(loginDto.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.status !== types_1.UserStatus.ACTIVE) {
            throw new common_1.UnauthorizedException('Account is not active');
        }
        await this.usersService.updateLastLogin(user.id);
        const tokens = await this.generateTokens(user);
        return {
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                },
                ...tokens,
            },
        };
    }
    async refreshAccessToken(refreshTokenDto) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });
            const storedToken = this.refreshTokens.get(refreshTokenDto.refreshToken);
            if (!storedToken || storedToken.userId !== payload.sub) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            if (new Date() > storedToken.expiry) {
                this.refreshTokens.delete(refreshTokenDto.refreshToken);
                throw new common_1.UnauthorizedException('Refresh token expired');
            }
            const response = await this.usersService.findOne(payload.sub);
            const user = response.data;
            if (!user || user.status !== types_1.UserStatus.ACTIVE) {
                throw new common_1.UnauthorizedException('User not found or inactive');
            }
            const tokens = await this.generateTokens(user);
            this.refreshTokens.delete(refreshTokenDto.refreshToken);
            return {
                success: true,
                message: 'Tokens refreshed successfully',
                data: tokens,
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Refresh token error: ${errorMessage}`);
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
    }
    async logout(refreshTokenDto) {
        try {
            this.refreshTokens.delete(refreshTokenDto.refreshToken);
            return {
                success: true,
                message: 'Logged out successfully',
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Logout error: ${errorMessage}`);
            throw new common_1.UnauthorizedException('Logout failed');
        }
    }
    async generateTokens(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        const expiresIn = this.configService.get('JWT_EXPIRES_IN') || '15m';
        const refreshExpiresIn = this.configService.get('JWT_REFRESH_EXPIRES_IN') || '7d';
        const refreshSecret = this.configService.get('JWT_REFRESH_SECRET') || 'default-refresh-secret';
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshTokenPayload = { ...payload, type: 'refresh' };
        const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
            secret: refreshSecret,
        });
        const refreshExpiry = new Date();
        refreshExpiry.setDate(refreshExpiry.getDate() + parseInt(refreshExpiresIn.replace(/\D/g, ''), 10));
        this.refreshTokens.set(refreshToken, {
            userId: user.id,
            expiry: refreshExpiry,
        });
        return {
            accessToken,
            refreshToken,
            expiresIn,
        };
    }
    async validateUser(userId) {
        const response = await this.usersService.findOne(userId);
        const user = response.data;
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map