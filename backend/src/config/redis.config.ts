import { config } from 'dotenv';

config();

// Redis connection options for cache-manager
export const redisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB || '0', 10),
  // Connection options
  connectTimeout: 10000, // 10 seconds
  lazyConnect: true,
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  // Enable offline queue
  enableReadyCheck: true,
  enableOfflineQueue: true,
};

// Redis key prefixes for different data types
export const RedisKeyPrefix = {
  // Session: User sessions for refresh tokens
  SESSION: 'session:',

  // OTP: One-time passwords for verification
  OTP: 'otp:',

  // Cache: Cached query results
  CACHE: 'cache:',

  // Rate Limit: Rate limiting counters
  RATE_LIMIT: 'rate_limit:',

  // Lock: Distributed locks
  LOCK: 'lock:',

  // Queue: Job queues
  QUEUE: 'queue:',
};

// TTL values in seconds
export const RedisTTL = {
  SESSION: 7 * 24 * 60 * 60, // 7 days
  OTP: 5 * 60, // 5 minutes
  CACHE: 15 * 60, // 15 minutes
  RATE_LIMIT: 60, // 1 minute
  LOCK: 30, // 30 seconds
};
