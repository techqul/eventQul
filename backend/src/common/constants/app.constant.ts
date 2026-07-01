/**
 * Application-wide constants
 */

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  // Generic errors
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Invalid request',
  INTERNAL_SERVER_ERROR: 'Internal server error',

  // Auth errors
  INVALID_CREDENTIALS: 'Invalid email or password',
  TOKEN_EXPIRED: 'Token has expired',
  TOKEN_INVALID: 'Invalid token',
  USER_NOT_FOUND: 'User not found',
  USER_EXISTS: 'User already exists',
  EMAIL_NOT_VERIFIED: 'Email not verified',

  // Event errors
  EVENT_NOT_FOUND: 'Event not found',
  EVENT_CANCELLED: 'Event has been cancelled',
  EVENT_FULL: 'Event is fully booked',
  EVENT_PAST: 'Event has already passed',

  // Ticket errors
  TICKET_NOT_FOUND: 'Ticket not found',
  TICKET_ALREADY_USED: 'Ticket has already been used',
  TICKET_CANCELLED: 'Ticket has been cancelled',
  TICKET_SOLD_OUT: 'Tickets are sold out',

  // Order errors
  ORDER_NOT_FOUND: 'Order not found',
  ORDER_EXPIRED: 'Order has expired',
  ORDER_ALREADY_PAID: 'Order has already been paid',

  // Payment errors
  PAYMENT_FAILED: 'Payment failed',
  PAYMENT_PENDING: 'Payment is pending',
  INVALID_PAYMENT_METHOD: 'Invalid payment method',

  // Coupon errors
  COUPON_INVALID: 'Invalid coupon code',
  COUPON_EXPIRED: 'Coupon has expired',
  COUPON_LIMIT_REACHED: 'Coupon usage limit reached',
  COUPON_MIN_ORDER: 'Minimum order value not met',

  // Organizer errors
  ORGANIZER_NOT_FOUND: 'Organizer not found',
  ORGANIZER_NOT_VERIFIED: 'Organizer not verified',
  ORGANIZER_EXISTS: 'Organizer profile already exists',

  // Validation errors
  VALIDATION_ERROR: 'Validation failed',
  INVALID_EMAIL: 'Invalid email address',
  INVALID_PHONE: 'Invalid phone number',
  INVALID_DATE: 'Invalid date format',
  WEAK_PASSWORD: 'Password is too weak',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
};

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  // Auth
  LOGIN_SUCCESS: 'Login successful',
  REGISTER_SUCCESS: 'Registration successful',
  LOGOUT_SUCCESS: 'Logout successful',
  EMAIL_VERIFIED: 'Email verified successfully',
  PASSWORD_RESET: 'Password reset successful',

  // User
  PROFILE_UPDATED: 'Profile updated successfully',
  PROFILE_DELETED: 'Profile deleted successfully',

  // Event
  EVENT_CREATED: 'Event created successfully',
  EVENT_UPDATED: 'Event updated successfully',
  EVENT_DELETED: 'Event deleted successfully',
  EVENT_PUBLISHED: 'Event published successfully',

  // Order
  ORDER_CREATED: 'Order created successfully',
  ORDER_CONFIRMED: 'Order confirmed successfully',
  ORDER_CANCELLED: 'Order cancelled successfully',

  // Ticket
  TICKET_PURCHASED: 'Ticket purchased successfully',
  TICKET_CANCELLED: 'Ticket cancelled successfully',
  TICKET_VALIDATED: 'Ticket validated successfully',

  // Payment
  PAYMENT_SUCCESS: 'Payment successful',
  PAYMENT_REFUNDED: 'Payment refunded successfully',

  // Organizer
  ORGANIZER_CREATED: 'Organizer profile created successfully',
  ORGANIZER_VERIFIED: 'Organizer verified successfully',

  // Notification
  NOTIFICATION_SENT: 'Notification sent successfully',

  // Generic
  OPERATION_SUCCESS: 'Operation completed successfully',
};

/**
 * Regular expressions for validation
 */
export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_BD: /^(?:\+?880|0)?1[3-9]\d{8}$/,
  SLUG: /^[a-z0-9-]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  DATE: /^\d{4}-\d{2}-\d{2}$/,
  DATETIME: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
};

/**
 * File size limits in bytes
 */
export const FILE_SIZE = {
  KB: 1024,
  MB: 1024 * 1024,
  MAX_AVATAR_SIZE: 2 * 1024 * 1024, // 2MB
  MAX_BANNER_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_EVENT_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
};

/**
 * Image dimensions
 */
export const IMAGE_DIMENSIONS = {
  AVATAR: {
    WIDTH: 200,
    HEIGHT: 200,
  },
  BANNER: {
    WIDTH: 1200,
    HEIGHT: 400,
  },
  EVENT_COVER: {
    WIDTH: 1200,
    HEIGHT: 630,
  },
};

/**
 * Supported image types
 */
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Currency
 */
export const CURRENCY = {
  DEFAULT: 'BDT',
  SYMBOL: '৳',
  DECIMAL_PLACES: 0,
};

/**
 * Timezones
 */
export const TIMEZONES = {
  DEFAULT: 'Asia/Dhaka',
  SUPPORTED: ['Asia/Dhaka', 'UTC', 'Asia/Kolkata', 'Asia/Singapore'],
};

/**
 * Event capacity limits
 */
export const EVENT_CAPACITY = {
  MIN: 1,
  MAX: 100000,
  DEFAULT: 100,
};

/**
 * Ticket limits
 */
export const TICKET_LIMITS = {
  MIN_PRICE: 0,
  MAX_PRICE: 1000000,
  MAX_PER_PURCHASE: 100,
  DEFAULT_MAX_PER_PURCHASE: 10,
};

/**
 * Commission rates
 */
export const COMMISSION = {
  MIN_RATE: 0,
  MAX_RATE: 30,
  DEFAULT_RATE: 10,
};

/**
 * Pagination limits
 */
export const PAGINATION_LIMITS = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 1,
};

/**
 * Cache keys
 */
export const CACHE_KEYS = {
  EVENTS: 'events:',
  EVENT: 'event:',
  ORGANIZERS: 'organizers:',
  ORGANIZER: 'organizer:',
  CATEGORIES: 'categories:',
  VENUES: 'venues:',
  USER: 'user:',
  STATS: 'stats:',
};
