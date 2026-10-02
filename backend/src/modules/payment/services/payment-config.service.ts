import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentProvider } from '../types/payment-provider.enum';

/**
 * Payment Gateway Configuration
 */
export interface PaymentGatewayConfig {
  baseURL: string;
  username?: string;
  password?: string;
  appKey?: string;
  appSecret?: string;
  merchantNumber?: string;
  storeId?: string;
  storePassword?: string;
  isSandbox?: boolean;
}

@Injectable()
export class PaymentConfigService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Get configuration for a payment provider
   */
  getProviderConfig(provider: PaymentProvider): PaymentGatewayConfig {
    switch (provider) {
      case PaymentProvider.BKASH:
        return this.getBkashConfig();
      case PaymentProvider.SSLCOMMERZ:
        return this.getSslcommerzConfig();
      default:
        throw new BadRequestException(`Unknown payment provider: ${provider}`);
    }
  }

  /**
   * Get bKash configuration
   */
  getBkashConfig(): PaymentGatewayConfig {
    const isSandbox = this.configService.get<string>('BKASH_IS_SANDBOX') === 'true';

    return {
      baseURL: isSandbox
        ? this.configService.get<string>('BKASH_SANDBOX_URL') || 'https://tokenized.sandbox.bka.sh/v1.2.0-beta'
        : this.configService.get<string>('BKASH_LIVE_URL') || 'https://tokenized.pay.bka.sh/v1.2.0-beta',
      username: this.configService.get<string>('BKASH_USERNAME'),
      password: this.configService.get<string>('BKASH_PASSWORD'),
      appKey: this.configService.get<string>('BKASH_APP_KEY'),
      appSecret: this.configService.get<string>('BKASH_APP_SECRET'),
      merchantNumber: this.configService.get<string>('BKASH_MERCHANT_NUMBER'),
      isSandbox,
    };
  }

  /**
   * Get SSLCommerz configuration
   */
  getSslcommerzConfig(): PaymentGatewayConfig {
    const isSandbox = this.configService.get<string>('SSLCOMMERZ_SANDBOX') === 'true';

    return {
      baseURL: isSandbox
        ? 'https://sandbox.payzilla.com'
        : 'https://securepay.sslcommerz.com',
      storeId: this.configService.get<string>('SSLCOMMERZ_STORE_ID'),
      storePassword: this.configService.get<string>('SSLCOMMERZ_STORE_PASSWORD'),
      isSandbox,
    };
  }

  /**
   * Get app URL for callbacks
   */
  getAppUrl(): string {
    return this.configService.get<string>('APP_URL') || 'http://localhost:3001';
  }

  /**
   * Verify provider credentials are configured
   */
  verifyProviderConfig(provider: PaymentProvider): boolean {
    const config = this.getProviderConfig(provider);

    switch (provider) {
      case PaymentProvider.BKASH:
        return !!(config.username && config.password && config.appKey && config.appSecret);
      case PaymentProvider.SSLCOMMERZ:
        return !!(config.storeId && config.storePassword);
      default:
        return false;
    }
  }
}
