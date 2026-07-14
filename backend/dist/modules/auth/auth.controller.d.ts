import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    refresh(refreshTokenDto: RefreshTokenDto): Promise<{
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
    getCurrentUser(req: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
