import { config } from 'dotenv';

config();

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  signOptions: {
    algorithm: 'HS256',
    issuer: process.env.APP_NAME || 'EventQul',
    audience: process.env.APP_URL || 'http://localhost:3001',
  },
};

export const jwtRefreshConfig = {
  secret: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-jwt-key-change-this-in-production',
  expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  signOptions: {
    algorithm: 'HS256',
    issuer: process.env.APP_NAME || 'EventQul',
    audience: process.env.APP_URL || 'http://localhost:3001',
  },
};

export const passwordConfig = {
  rounds: parseInt(process.env.BCRYPT_ROUNDS || '10', 10),
};

export const authConfig = {
  passwordResetExpiresIn: process.env.PASSWORD_RESET_EXPIRES_IN || '1h',
  emailVerificationExpiresIn: process.env.EMAIL_VERIFICATION_EXPIRES_IN || '24h',
};
