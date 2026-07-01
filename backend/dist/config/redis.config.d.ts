export declare const redisOptions: {
    host: string;
    port: number;
    password: string | undefined;
    db: number;
    connectTimeout: number;
    lazyConnect: boolean;
    retryStrategy: (times: number) => number;
    enableReadyCheck: boolean;
    enableOfflineQueue: boolean;
};
export declare const RedisKeyPrefix: {
    SESSION: string;
    OTP: string;
    CACHE: string;
    RATE_LIMIT: string;
    LOCK: string;
    QUEUE: string;
};
export declare const RedisTTL: {
    SESSION: number;
    OTP: number;
    CACHE: number;
    RATE_LIMIT: number;
    LOCK: number;
};
