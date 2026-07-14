import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from '../users/entities/user.entity';
import { UserStatus } from '../users/types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly refreshTokens: Map<string, { userId: string; expiry: Date }> =
    new Map();

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(
      registerDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Create new user
    const user = await this.usersService.register(registerDto);

    // Update user status to ACTIVE after registration
    await this.usersService.updateStatus(user.id, UserStatus.ACTIVE);

    // Generate tokens
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

  async login(loginDto: LoginDto) {
    // Find user by email
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate password
    const isPasswordValid = await user.validatePassword(loginDto.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Account is not active');
    }

    // Update last login
    await this.usersService.updateLastLogin(user.id);

    // Generate tokens
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

  async refreshAccessToken(refreshTokenDto: RefreshTokenDto) {
    try {
      // Verify refresh token
      const payload = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        },
      );

      // Check if refresh token exists in store
      const storedToken = this.refreshTokens.get(refreshTokenDto.refreshToken);

      if (!storedToken || storedToken.userId !== payload.sub) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Check if token expired
      if (new Date() > storedToken.expiry) {
        this.refreshTokens.delete(refreshTokenDto.refreshToken);
        throw new UnauthorizedException('Refresh token expired');
      }

      // Get user
      const user = await this.usersService.findOne(payload.sub);

      if (!user || user.status !== UserStatus.ACTIVE) {
        throw new UnauthorizedException('User not found or inactive');
      }

      // Generate new tokens
      const tokens = await this.generateTokens(user);

      // Remove old refresh token
      this.refreshTokens.delete(refreshTokenDto.refreshToken);

      return {
        success: true,
        message: 'Tokens refreshed successfully',
        data: tokens,
      };
    } catch (error) {
      this.logger.error(`Refresh token error: ${error.message}`);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async logout(refreshTokenDto: RefreshTokenDto) {
    try {
      // Remove refresh token from store
      this.refreshTokens.delete(refreshTokenDto.refreshToken);

      return {
        success: true,
        message: 'Logged out successfully',
      };
    } catch (error) {
      this.logger.error(`Logout error: ${error.message}`);
      throw new UnauthorizedException('Logout failed');
    }
  }

  private async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN') || '15m';
    const refreshExpiresIn =
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d';
    const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET') || 'default-refresh-secret';

    // Access token
    const accessToken = await this.jwtService.signAsync(payload);

    // Refresh token with different expiry and secret
    const refreshTokenPayload = { ...payload, type: 'refresh' };
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
      secret: refreshSecret,
    });

    // Store refresh token with expiry
    const refreshExpiry = new Date();
    refreshExpiry.setDate(
      refreshExpiry.getDate() + parseInt(refreshExpiresIn.replace(/\D/g, ''), 10),
    );

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

  async validateUser(userId: string): Promise<any> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
