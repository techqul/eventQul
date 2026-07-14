import { config } from 'dotenv';

config();

export const appConfig = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001', 10),
  apiPrefix: process.env.API_PREFIX || 'api',
  appName: process.env.APP_NAME || 'EventQul',
  appUrl: process.env.APP_URL || 'http://localhost:3001',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  timezone: process.env.DEFAULT_TIMEZONE || 'Asia/Dhaka',
  version: '1.0.0',
};

export const storageConfig = {
  type: process.env.STORAGE_TYPE || 'local', // 'local' or 's3'
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5MB
  allowedFileTypes: (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp').split(
    ',',
  ),
  uploadPath: process.env.UPLOAD_PATH || './uploads',
};

export const paymentConfig = {
  convenienceFee: {
    type: process.env.CONVENIENCE_FEE_TYPE || 'percentage',
    value: parseFloat(process.env.CONVENIENCE_FEE_VALUE || '5'),
    minimum: parseFloat(process.env.CONVENIENCE_FEE_MINIMUM || '50'),
  },
  commission: {
    defaultRate: parseFloat(process.env.DEFAULT_COMMISSION_RATE || '10'),
  },
  bKash: {
    merchantNumber: process.env.BKASH_MERCHANT_NUMBER || '',
    username: process.env.BKASH_USERNAME || '',
    password: process.env.BKASH_PASSWORD || '',
    appKey: process.env.BKASH_APP_KEY || '',
    appSecret: process.env.BKASH_APP_SECRET || '',
    sandboxUrl: process.env.BKASH_SANDBOX_URL || 'https://tokenized.sandbox.bka.sh/v1.2.0-beta',
    liveUrl: process.env.BKASH_LIVE_URL || 'https://tokenized.pay.bka.sh/v1.2.0-beta',
    isSandbox: process.env.BKASH_IS_SANDBOX === 'true',
  },
};

export const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  user: process.env.SMTP_USER || '',
  password: process.env.SMTP_PASSWORD || '',
  from: process.env.EMAIL_FROM || 'noreply@eventqul.com',
  fromName: process.env.EMAIL_FROM_NAME || 'EventQul',
};

export const smsConfig = {
  provider: process.env.SMS_PROVIDER || 'bulk-sms-bd',
  apiKey: process.env.SMS_API_KEY || '',
  senderId: process.env.SMS_SENDER_ID || '',
};
