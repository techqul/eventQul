import { SetMetadata } from '@nestjs/common';

/**
 * Roles metadata key
 */
export const ROLES_KEY = 'roles';

/**
 * Roles Decorator
 * Specifies which roles can access a route
 * Usage: @Roles('user', 'organizer', 'admin')
 *
 * @param roles - Array of allowed roles
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
