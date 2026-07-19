import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from '../users/entities/user.entity';
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
}
export interface AuthResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
}
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    private readonly logger;
    private readonly refreshTokens;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(registerDto: RegisterDto): Promise<AuthResponse>;
    login(loginDto: LoginDto): Promise<AuthResponse>;
    refreshAccessToken(refreshTokenDto: RefreshTokenDto): Promise<AuthTokens>;
    logout(refreshTokenDto: RefreshTokenDto): Promise<void>;
    private generateTokens;
    validateUser(userId: string): Promise<User>;
}
