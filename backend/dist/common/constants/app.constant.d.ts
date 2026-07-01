export declare const ERROR_MESSAGES: {
    UNAUTHORIZED: string;
    FORBIDDEN: string;
    NOT_FOUND: string;
    BAD_REQUEST: string;
    INTERNAL_SERVER_ERROR: string;
    INVALID_CREDENTIALS: string;
    TOKEN_EXPIRED: string;
    TOKEN_INVALID: string;
    USER_NOT_FOUND: string;
    USER_EXISTS: string;
    EMAIL_NOT_VERIFIED: string;
    EVENT_NOT_FOUND: string;
    EVENT_CANCELLED: string;
    EVENT_FULL: string;
    EVENT_PAST: string;
    TICKET_NOT_FOUND: string;
    TICKET_ALREADY_USED: string;
    TICKET_CANCELLED: string;
    TICKET_SOLD_OUT: string;
    ORDER_NOT_FOUND: string;
    ORDER_EXPIRED: string;
    ORDER_ALREADY_PAID: string;
    PAYMENT_FAILED: string;
    PAYMENT_PENDING: string;
    INVALID_PAYMENT_METHOD: string;
    COUPON_INVALID: string;
    COUPON_EXPIRED: string;
    COUPON_LIMIT_REACHED: string;
    COUPON_MIN_ORDER: string;
    ORGANIZER_NOT_FOUND: string;
    ORGANIZER_NOT_VERIFIED: string;
    ORGANIZER_EXISTS: string;
    VALIDATION_ERROR: string;
    INVALID_EMAIL: string;
    INVALID_PHONE: string;
    INVALID_DATE: string;
    WEAK_PASSWORD: string;
    PASSWORDS_DO_NOT_MATCH: string;
};
export declare const SUCCESS_MESSAGES: {
    LOGIN_SUCCESS: string;
    REGISTER_SUCCESS: string;
    LOGOUT_SUCCESS: string;
    EMAIL_VERIFIED: string;
    PASSWORD_RESET: string;
    PROFILE_UPDATED: string;
    PROFILE_DELETED: string;
    EVENT_CREATED: string;
    EVENT_UPDATED: string;
    EVENT_DELETED: string;
    EVENT_PUBLISHED: string;
    ORDER_CREATED: string;
    ORDER_CONFIRMED: string;
    ORDER_CANCELLED: string;
    TICKET_PURCHASED: string;
    TICKET_CANCELLED: string;
    TICKET_VALIDATED: string;
    PAYMENT_SUCCESS: string;
    PAYMENT_REFUNDED: string;
    ORGANIZER_CREATED: string;
    ORGANIZER_VERIFIED: string;
    NOTIFICATION_SENT: string;
    OPERATION_SUCCESS: string;
};
export declare const REGEX: {
    EMAIL: RegExp;
    PHONE_BD: RegExp;
    SLUG: RegExp;
    PASSWORD: RegExp;
    DATE: RegExp;
    DATETIME: RegExp;
};
export declare const FILE_SIZE: {
    KB: number;
    MB: number;
    MAX_AVATAR_SIZE: number;
    MAX_BANNER_SIZE: number;
    MAX_EVENT_IMAGE_SIZE: number;
};
export declare const IMAGE_DIMENSIONS: {
    AVATAR: {
        WIDTH: number;
        HEIGHT: number;
    };
    BANNER: {
        WIDTH: number;
        HEIGHT: number;
    };
    EVENT_COVER: {
        WIDTH: number;
        HEIGHT: number;
    };
};
export declare const IMAGE_TYPES: string[];
export declare const CURRENCY: {
    DEFAULT: string;
    SYMBOL: string;
    DECIMAL_PLACES: number;
};
export declare const TIMEZONES: {
    DEFAULT: string;
    SUPPORTED: string[];
};
export declare const EVENT_CAPACITY: {
    MIN: number;
    MAX: number;
    DEFAULT: number;
};
export declare const TICKET_LIMITS: {
    MIN_PRICE: number;
    MAX_PRICE: number;
    MAX_PER_PURCHASE: number;
    DEFAULT_MAX_PER_PURCHASE: number;
};
export declare const COMMISSION: {
    MIN_RATE: number;
    MAX_RATE: number;
    DEFAULT_RATE: number;
};
export declare const PAGINATION_LIMITS: {
    DEFAULT_PAGE_SIZE: number;
    MAX_PAGE_SIZE: number;
    MIN_PAGE_SIZE: number;
};
export declare const CACHE_KEYS: {
    EVENTS: string;
    EVENT: string;
    ORGANIZERS: string;
    ORGANIZER: string;
    CATEGORIES: string;
    VENUES: string;
    USER: string;
    STATS: string;
};
