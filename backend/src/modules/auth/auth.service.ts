import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from '../users/entities/user.entity';
import { UserStatus } from '../users/types';

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

@Injectable()
export class AuthService {
  private readonly refreshTokens: Map<string, { userId: string; expiry: Date }> = new Map();

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const user = await this.usersService.register(registerDto);
    const tokens = await this.generateTokens(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      ...tokens,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await user.validatePassword(loginDto.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Account is not active');
    }

    await this.usersService.updateLastLogin(user.id);

    const tokens = await this.generateTokens(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      ...tokens,
    };
  }

  async refreshAccessToken(refreshTokenDto: RefreshTokenDto): Promise<AuthTokens> {
    const payload = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });

    const storedToken = this.refreshTokens.get(refreshTokenDto.refreshToken);

    if (!storedToken || storedToken.userId !== payload.sub) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (new Date() > storedToken.expiry) {
      this.refreshTokens.delete(refreshTokenDto.refreshToken);
      throw new UnauthorizedException('Refresh token expired');
    }

    const user = await this.usersService.findOne(payload.sub);

    if (!user || user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('User not found or inactive');
    }

    const tokens = await this.generateTokens(user);
    this.refreshTokens.delete(refreshTokenDto.refreshToken);

    return tokens;
  }

  logout(refreshTokenDto: RefreshTokenDto): void {
    this.refreshTokens.delete(refreshTokenDto.refreshToken);
  }

  private async generateTokens(user: User): Promise<AuthTokens> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN') || '15m';
    const refreshExpiresIn = this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d';
    const refreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET') || 'default-refresh-secret';

    const accessToken = await this.jwtService.signAsync(payload);

    const refreshTokenPayload = { ...payload, type: 'refresh' };
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
      secret: refreshSecret,
    });

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

  async validateUser(userId: string): Promise<User> {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
