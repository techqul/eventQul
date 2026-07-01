import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

/**
 * Permission Guard
 * Checks if user has required permission(s)
 * Usage: @Permissions('events.create', 'events.update:own')
 *
 * This guard requires:
 * 1. User to be authenticated (JwtAuthGuard should be used first)
 * 2. User role with permissions to be loaded (typically via a custom decorator)
 *
 * Note: This guard will be implemented in Phase 5 (Role & Permission Module)
 * For now, it serves as a placeholder for the permission system
 */
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required permissions from decorator
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no permissions required, allow access
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if user exists (should be attached by JwtAuthGuard)
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // TODO: Implement permission checking logic
    // This will be implemented in Phase 5 when we create the Permission module
    // For now, admins have all permissions
    if (user.role === 'admin') {
      return true;
    }

    // Placeholder: Throw error until permissions are implemented
    throw new ForbiddenException(
      'Permission system will be implemented in Phase 5',
    );
  }
}

/**
 * Resource ownership guard
 * Checks if user owns the resource they're trying to access/modify
 * Usage: @IsOwner('userId') checks if request.user.id === resource.userId
 *
 * This will be implemented along with individual modules
 */
@Injectable()
export class ResourceOwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // TODO: Implement resource ownership checking
    // This will be implemented per-module as needed

    throw new ForbiddenException(
      'Resource ownership guard not yet implemented',
    );
  }
}
