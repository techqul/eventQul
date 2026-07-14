import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { USER_ROLES } from '../constants/pagination.constant';

/**
 * Roles Guard
 * Checks if user has required role(s)
 * Usage: @Roles('user', 'organizer', 'admin')
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get required roles from decorator
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if user exists (should be attached by JwtAuthGuard)
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Check if user has required role
    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      throw new ForbiddenException(`Access denied. Required role(s): ${requiredRoles.join(', ')}`);
    }

    return true;
  }
}

/**
 * Admin only guard
 * Shortcut for checking admin role
 */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (user.role !== USER_ROLES.ADMIN) {
      throw new ForbiddenException('Admin access required');
    }

    return true;
  }
}

/**
 * Organizer or Admin guard
 * Allows access to organizers and admins
 */
@Injectable()
export class OrganizerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const allowedRoles = [USER_ROLES.ORGANIZER, USER_ROLES.ADMIN];
    const hasRole = allowedRoles.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException('Organizer access required');
    }

    return true;
  }
}
