"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COUPON_TYPE = exports.NOTIFICATION_TYPE = exports.TICKET_STATUS = exports.PAYMENT_METHOD = exports.PAYMENT_STATUS = exports.ORDER_STATUS = exports.EVENT_STATUS = exports.USER_ROLES = exports.CACHE_TTL = exports.APP = exports.PAGINATION = void 0;
exports.PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MIN_LIMIT: 1,
    MAX_LIMIT: 100,
};
exports.APP = {
    NAME: 'EventQul',
    VERSION: '1.0.0',
    DESCRIPTION: 'SaaS Event Ticketing Platform',
};
exports.CACHE_TTL = {
    SHORT: 300,
    MEDIUM: 900,
    LONG: 3600,
    VERY_LONG: 86400,
};
exports.USER_ROLES = {
    USER: 'user',
    ORGANIZER: 'organizer',
    ADMIN: 'admin',
};
exports.EVENT_STATUS = {
    UPCOMING: 'upcoming',
    ONGOING: 'ongoing',
    PAST: 'past',
    CANCELLED: 'cancelled',
};
exports.ORDER_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
};
exports.PAYMENT_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
};
exports.PAYMENT_METHOD = {
    BKASH: 'bkash',
    NAGAD: 'nagad',
    ROCKET: 'rocket',
    CARD: 'card',
    COD: 'cod',
};
exports.TICKET_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled',
    USED: 'used',
    REFUNDED: 'refunded',
};
exports.NOTIFICATION_TYPE = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    EVENT_REMINDER: 'event_reminder',
    TICKET: 'ticket',
    PAYMENT: 'payment',
    ORGANIZER: 'organizer',
};
exports.COUPON_TYPE = {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
};
//# sourceMappingURL=pagination.constant.js.map