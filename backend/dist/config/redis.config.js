"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisTTL = exports.RedisKeyPrefix = exports.redisOptions = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.redisOptions = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB || '0', 10),
    connectTimeout: 10000,
    lazyConnect: true,
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
    },
    enableReadyCheck: true,
    enableOfflineQueue: true,
};
exports.RedisKeyPrefix = {
    SESSION: 'session:',
    OTP: 'otp:',
    CACHE: 'cache:',
    RATE_LIMIT: 'rate_limit:',
    LOCK: 'lock:',
    QUEUE: 'queue:',
};
exports.RedisTTL = {
    SESSION: 7 * 24 * 60 * 60,
    OTP: 5 * 60,
    CACHE: 15 * 60,
    RATE_LIMIT: 60,
    LOCK: 30,
};
//# sourceMappingURL=redis.config.js.map