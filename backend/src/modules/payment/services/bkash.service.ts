import { Injectable, BadRequestException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

import {
  CreatePaymentRequest,
  CreatePaymentResponse,
} from '../interfaces/payment-provider.interface';

import { PaymentConfigService, PaymentGatewayConfig } from './payment-config.service';

interface BkashTokenResponse {
  id_token: string;
  token_type: string;
  expires_in: number;
}

interface BkashCreateResponse {
  paymentID: string;
  createTime: string;
  updateTime: string;
  transactionStatus: string;
  amount: string;
  currency: string;
  intent: string;
  merchantInvoiceNumber: string;
  bkashURL: string;
  status?: string;
  statusCode?: string;
  statusMessage?: string;
}

interface BkashExecuteResponse {
  paymentID: string;
  trxID?: string;
  transactionStatus?: string;
  amount?: string;
  currency?: string;
  intent?: string;
  merchantInvoiceNumber?: string;
  paymentExecuteTime?: string;
  statusCode?: string;
  statusMessage?: string;
  status?: string;
}

interface BkashQueryResponse {
  paymentID: string;
  trxID?: string;
  transactionStatus?: string;
  amount?: string;
  currency?: string;
  intent?: string;
  merchantInvoiceNumber?: string;
  paymentExecuteTime?: string;
  statusCode?: string;
  statusMessage?: string;
  status?: string;
}

@Injectable()
export class BkashService {
  private readonly axiosClient: AxiosInstance;
  private readonly config: PaymentGatewayConfig;

  private grantToken: string | null = null;
  private tokenExpiresAt: number | null = null;

  constructor(private readonly paymentConfigService: PaymentConfigService) {
    this.config = this.paymentConfigService.getBkashConfig();

    this.axiosClient = axios.create({
      baseURL: this.config.baseURL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  /**
   * Validate bKash configuration
   */
  private getConfig(): PaymentGatewayConfig {
    if (
      !this.config.username ||
      !this.config.password ||
      !this.config.appKey ||
      !this.config.appSecret ||
      !this.config.baseURL
    ) {
      throw new BadRequestException(
        'bKash credentials/configuration not configured. Please check environment variables.',
      );
    }

    return this.config;
  }

  /**
   * Get bKash Grant Token
   *
   * Token is cached until expiration.
   */
  async getGrantToken(): Promise<string> {
    const config = this.getConfig();

    // Return cached token if still valid
    if (this.grantToken && this.tokenExpiresAt && Date.now() < this.tokenExpiresAt) {
      return this.grantToken;
    }

    try {
      const response = await this.axiosClient.post<BkashTokenResponse>(
        '/tokenized/checkout/token/grant',
        {
          app_key: config.appKey,
          app_secret: config.appSecret,
        },
        {
          headers: {
            username: config.username,
            password: config.password,
          },
        },
      );

      const token = response.data.id_token;

      if (!token) {
        throw new Error('bKash token not received');
      }

      const expiresIn = response.data.expires_in || 3000;

      this.grantToken = token;

      // Keep 1 minute safety buffer
      this.tokenExpiresAt = Date.now() + expiresIn * 1000 - 60_000;

      return token;
    } catch (error: any) {
      console.error('bKash grant token error:', error.response?.data || error.message);

      throw new BadRequestException(
        error.response?.data?.statusMessage || 'Failed to get bKash grant token',
      );
    }
  }

  /**
   * Create bKash Payment
   */
  async createPayment(request: CreatePaymentRequest): Promise<CreatePaymentResponse> {
    const config = this.getConfig();
    const token = await this.getGrantToken();

    try {
      const payload = {
        mode: '0000',

        payerReference: config.merchantNumber || '01619777283',

        callbackURL: `${process.env.APP_URL}/api/v1/payment/bkash/callback`,

        amount: Number(request.amount).toFixed(2),

        currency: 'BDT',

        intent: 'sale',

        merchantInvoiceNumber:`EVENTQUL-${Date.now()}`,
      };

      const response = await this.axiosClient.post<BkashCreateResponse>(
        '/tokenized/checkout/create',
        payload,
        {
          headers: {
            Authorization: token,
            'X-App-Key': config.appKey,
          },
        },
      );

      const data = response.data;

      console.log('bKash create payment response:', data);

      if (data.statusCode === '0000' && data.paymentID && data.bkashURL) {
        return {
          success: true,

          paymentId: data.paymentID,

          redirectUrl: data.bkashURL,

          providerTransactionId: data.paymentID,

          amount: Number(data.amount || request.amount),

          expiresAt: new Date(Date.now() + 30 * 60 * 1000),
        };
      }

      return {
        success: false,
        paymentId: '',
        message: data.statusMessage || data.status || 'Failed to create bKash payment',
      };
    } catch (error: any) {
      console.error('bKash create payment error:', error.response?.data || error.message);

      return {
        success: false,
        paymentId: '',
        message: error.response?.data?.statusMessage || 'Failed to create bKash payment',
      };
    }
  }

  /**
   * Execute bKash Payment
   *
   * Called after customer completes payment
   * and bKash redirects/calls the callback URL.
   */
  async executePayment(paymentID: string): Promise<BkashExecuteResponse> {
    if (!paymentID) {
      throw new BadRequestException('bKash paymentID is required');
    }

    const config = this.getConfig();
    const token = await this.getGrantToken();

    try {
      const response = await this.axiosClient.post<BkashExecuteResponse>(
        '/tokenized/checkout/execute',
        {
          paymentID,
        },
        {
          headers: {
            Authorization: token,
            'X-App-Key': config.appKey,
          },
        },
      );

      console.log('bKash execute payment response:', response.data);

      return response.data;
    } catch (error: any) {
      console.error('bKash execute payment error:', error.response?.data || error.message);

      throw new BadRequestException(
        error.response?.data?.statusMessage || 'Failed to execute bKash payment',
      );
    }
  }

  /**
   * Query Payment
   *
   * Useful for verifying payment status.
   */
  async queryPayment(paymentID: string): Promise<BkashQueryResponse> {
    if (!paymentID) {
      throw new BadRequestException('bKash paymentID is required');
    }

    const config = this.getConfig();
    const token = await this.getGrantToken();

    try {
      const response = await this.axiosClient.post<BkashQueryResponse>(
        '/tokenized/checkout/payment/status',
        {
          paymentID,
        },
        {
          headers: {
            Authorization: token,
            'X-App-Key': config.appKey,
          },
        },
      );

      console.log('bKash query payment response:', response.data);

      return response.data;
    } catch (error: any) {
      console.error('bKash query payment error:', error.response?.data || error.message);

      throw new BadRequestException(
        error.response?.data?.statusMessage || 'Failed to query bKash payment',
      );
    }
  }
}
