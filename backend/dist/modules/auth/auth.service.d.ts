import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from '../users/entities/user.entity';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    private readonly logger;
    private readonly refreshTokens;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(registerDto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        data: {
            accessToken: string;
            refreshToken: string;
            expiresIn: string;
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                role: import("../users/types").UserRole;
            };
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        message: string;
        data: {
            accessToken: string;
            refreshToken: string;
            expiresIn: string;
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                role: import("../users/types").UserRole;
            };
        };
    }>;
    refreshAccessToken(refreshTokenDto: RefreshTokenDto): Promise<{
        success: boolean;
        message: string;
        data: {
            accessToken: string;
            refreshToken: string;
            expiresIn: string;
        };
    }>;
    logout(refreshTokenDto: RefreshTokenDto): Promise<{
        success: boolean;
        message: string;
    }>;
    private generateTokens;
    validateUser(userId: string): Promise<User>;
}
