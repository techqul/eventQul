import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("./auth.service").AuthResponse>;
    login(loginDto: LoginDto): Promise<import("./auth.service").AuthResponse>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<import("./auth.service").AuthTokens>;
    logout(refreshTokenDto: RefreshTokenDto): Promise<void>;
    getCurrentUser(req: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
