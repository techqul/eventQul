export declare const PAGINATION: {
    DEFAULT_PAGE: number;
    DEFAULT_LIMIT: number;
    MIN_LIMIT: number;
    MAX_LIMIT: number;
};
export declare const APP: {
    NAME: string;
    VERSION: string;
    DESCRIPTION: string;
};
export declare const CACHE_TTL: {
    SHORT: number;
    MEDIUM: number;
    LONG: number;
    VERY_LONG: number;
};
export declare const USER_ROLES: {
    readonly USER: "user";
    readonly ORGANIZER: "organizer";
    readonly ADMIN: "admin";
};
export declare const EVENT_STATUS: {
    readonly UPCOMING: "upcoming";
    readonly ONGOING: "ongoing";
    readonly PAST: "past";
    readonly CANCELLED: "cancelled";
};
export declare const ORDER_STATUS: {
    readonly PENDING: "pending";
    readonly CONFIRMED: "confirmed";
    readonly CANCELLED: "cancelled";
    readonly REFUNDED: "refunded";
};
export declare const PAYMENT_STATUS: {
    readonly PENDING: "pending";
    readonly PROCESSING: "processing";
    readonly COMPLETED: "completed";
    readonly FAILED: "failed";
    readonly REFUNDED: "refunded";
};
export declare const PAYMENT_METHOD: {
    readonly BKASH: "bkash";
    readonly NAGAD: "nagad";
    readonly ROCKET: "rocket";
    readonly CARD: "card";
    readonly COD: "cod";
};
export declare const TICKET_STATUS: {
    readonly PENDING: "pending";
    readonly CONFIRMED: "confirmed";
    readonly CANCELLED: "cancelled";
    readonly USED: "used";
    readonly REFUNDED: "refunded";
};
export declare const NOTIFICATION_TYPE: {
    readonly INFO: "info";
    readonly SUCCESS: "success";
    readonly WARNING: "warning";
    readonly EVENT_REMINDER: "event_reminder";
    readonly TICKET: "ticket";
    readonly PAYMENT: "payment";
    readonly ORGANIZER: "organizer";
};
export declare const COUPON_TYPE: {
    readonly PERCENTAGE: "percentage";
    readonly FIXED: "fixed";
};
