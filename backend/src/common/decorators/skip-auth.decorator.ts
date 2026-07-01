import { SetMetadata } from '@nestjs/common';

/**
 * Skip Auth metadata key
 */
export const SKIP_AUTH_KEY = 'skipAuth';

/**
 * Public Decorator
 * Marks a route as public (no authentication required)
 * Usage: @Public() or @SkipAuth()
 *
 * This decorator should be placed on routes that don't require authentication,
 * such as login, register, event listings, etc.
 */
export const Public = () => SetMetadata(SKIP_AUTH_KEY, true);

/**
 * Alias for Public decorator
 */
export const SkipAuth = Public;
