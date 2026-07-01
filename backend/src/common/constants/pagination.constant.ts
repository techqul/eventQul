/**
 * Pagination constants
 * Default values and limits for pagination
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MIN_LIMIT: 1,
  MAX_LIMIT: 100,
};

/**
 * Application constants
 */
export const APP = {
  NAME: 'EventQul',
  VERSION: '1.0.0',
  DESCRIPTION: 'SaaS Event Ticketing Platform',
};

/**
 * Cache TTL in seconds
 */
export const CACHE_TTL = {
  SHORT: 300, // 5 minutes
  MEDIUM: 900, // 15 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400, // 24 hours
};

/**
 * User roles
 */
export const USER_ROLES = {
  USER: 'user',
  ORGANIZER: 'organizer',
  ADMIN: 'admin',
} as const;

/**
 * Event status
 */
export const EVENT_STATUS = {
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing',
  PAST: 'past',
  CANCELLED: 'cancelled',
} as const;

/**
 * Order status
 */
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

/**
 * Payment status
 */
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

/**
 * Payment methods
 */
export const PAYMENT_METHOD = {
  BKASH: 'bkash',
  NAGAD: 'nagad',
  ROCKET: 'rocket',
  CARD: 'card',
  COD: 'cod',
} as const;

/**
 * Ticket status
 */
export const TICKET_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  USED: 'used',
  REFUNDED: 'refunded',
} as const;

/**
 * Notification types
 */
export const NOTIFICATION_TYPE = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  EVENT_REMINDER: 'event_reminder',
  TICKET: 'ticket',
  PAYMENT: 'payment',
  ORGANIZER: 'organizer',
} as const;

/**
 * Coupon types
 */
export const COUPON_TYPE = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
} as const;
