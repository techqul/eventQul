import { SetMetadata } from '@nestjs/common';

/**
 * Permissions metadata key
 */
export const PERMISSIONS_KEY = 'permissions';

/**
 * Permissions Decorator
 * Specifies which permissions are required for a route
 * Usage: @Permissions('events.create', 'events.update:own')
 *
 * @param permissions - Array of required permissions
 */
export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
