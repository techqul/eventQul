import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConfig } from '../../config/jwt.config';
import { SKIP_AUTH_KEY } from '../decorators/skip-auth.decorator';

/**
 * JWT Authentication Guard
 * Validates JWT tokens and attaches user to request
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if auth should be skipped for this route
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skipAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Access token is missing');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConfig.secret,
      });

      // Attach user to request
      // Include both 'id' and 'sub' for compatibility
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
    } catch (error) {
      this.logger.error(`JWT verification failed: ${error.message}`);

      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Access token has expired');
      }

      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid access token');
      }

      throw new UnauthorizedException('Authentication failed');
    }
  }

  /**
   * Extract JWT token from Authorization header
   * Expected format: "Bearer <token>"
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
