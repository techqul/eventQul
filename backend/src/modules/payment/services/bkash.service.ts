import { Injectable, BadRequestException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {
  IPaymentProvider,
  CreatePaymentRequest,
  CreatePaymentResponse,
  ExecutePaymentRequest,
  ExecutePaymentResponse,
  QueryPaymentRequest,
  QueryPaymentResponse,
  RefundPaymentRequest,
  RefundPaymentResponse,
} from '../interfaces/payment-provider.interface';
import { PaymentProvider, PaymentStatus } from '../types/payment-provider.enum';
import { PaymentConfigService, PaymentGatewayConfig } from './payment-config.service';

/**
 * bKash Grant Token Response
 */
interface BkashTokenResponse {
  id_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * bKash Create Payment Response
 */
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
}

/**
 * bKash Execute Payment Response
 */
interface BkashExecuteResponse {
  paymentID: string;
  transactionStatus: string;
  amount: string;
  currency: string;
  trxID: string;
  merchantInvoiceNumber: string;
  status?: string;
  statusCode?: string;
  statusMessage?: string;
  completedTime?: string;
}

/**
 * bKash Query Payment Response
 */
interface BkashQueryResponse {
  paymentID: string;
  transactionStatus: string;
  amount: string;
  currency: string;
  trxID: string;
  merchantInvoiceNumber: string;
  completedTime?: string;
  status?: string;
  statusCode?: string;
}

/**
 * bKash Refund Response
 */
interface BkashRefundResponse {
  transactionStatus: string;
  transactionId: string;
  completedTime: string;
  amount: string;
  currency: string;
  status?: string;
  statusCode?: string;
}

@Injectable()
export class BkashService implements IPaymentProvider {
  private readonly axiosClient: AxiosInstance;
  private readonly config: PaymentGatewayConfig;
  private grantToken: string | null = null;
  private tokenExpiresAt: Date | null = null;

  constructor(private readonly paymentConfigService: PaymentConfigService) {
    // Get config once and cache it
    this.config = this.paymentConfigService.getBkashConfig();

    // Verify credentials on initialization
    if (!this.paymentConfigService.verifyProviderConfig(PaymentProvider.BKASH)) {
      console.warn('bKash credentials not configured. Please check environment variables.');
    }

    // Initialize axios client with config
    this.axiosClient = axios.create({
      baseURL: this.config.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }

  /**
   * Get provider name
   */
  getProvider(): PaymentProvider {
    return PaymentProvider.BKASH;
  }

  /**
   * Get bKash configuration (cached)
   */
  private getConfig(): PaymentGatewayConfig {
    // Verify credentials before returning config
    if (!this.config.username || !this.config.password ||
        !this.config.appKey || !this.config.appSecret) {
      throw new BadRequestException('bKash credentials not configured. Please check environment variables.');
    }
    return this.config;
  }

  /**
   * Get grant token (access token) from bKash
   * Token expires in 50 minutes, cache it until expiration
   */
   async getGrantToken(): Promise<string> {

    const config = this.getConfig();

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

      console.log("response", response)

      const token = response.data.id_token;
      const expiresIn = response.data.expires_in || 3000; // Default 50 minutes

      // Cache the token
      this.grantToken = token;
      this.tokenExpiresAt = new Date(Date.now() + expiresIn * 1000 - 60000); // 1 min buffer

      return token;
    } catch (error: any) {
      console.error('bKash grant token error:', error.response?.data || error.message);
      throw new BadRequestException('Failed to get bKash grant token');
    }
  }

  /**
   * Create payment with bKash
   */
  async createPayment(request: CreatePaymentRequest): Promise<CreatePaymentResponse> {
    const token = await this.getGrantToken();
    const config = this.getConfig();

    try {
      const payload = {
        mode: '0000',
        payerReference: config.merchantNumber,
        callbackURL: request.callbackUrl,
        amount: request.amount.toString(),
        currency: 'BDT',
        intent: 'sale'
      };

      console.log("payload", payload)
      console.log("token", token)

      const response = await this.axiosClient.post<BkashCreateResponse>(
        '/tokenized/checkout/create',
        payload,
        {
          headers: {
            Authorization: token,
            'x-app-key': config.appKey,
          },
        },
      );
      console.log("response", response)
      const data = response.data;


      console.log("data", data)

      if (data.statusCode === '0000' || data.paymentID) {
        return {
          success: true,
          paymentId: data.paymentID,
          redirectUrl: data.bkashURL,
          providerTransactionId: data.paymentID,
          amount: parseFloat(data.amount),
          expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
        };
      } else {
        return {
          success: false,
          paymentId: '',
          message: data.status || 'Failed to create bKash payment',
        };
      }
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
   * Execute payment after user completes payment on bKash
   */
  async executePayment(request: ExecutePaymentRequest): Promise<ExecutePaymentResponse> {
    const token = await this.getGrantToken();
    const config = this.getConfig();

    try {
      const response = await this.axiosClient.post<BkashExecuteResponse>(
        '/tokenized/checkout/execute',
        {
          paymentID: request.providerTransactionId,
        },
        {
          headers: {
            Authorization: token,
            'x-app-key': config.appKey,
          },
        },
      );

      const data = response.data;

      // bKash returns statusCode: 0000 for successful payment
      if (data.statusCode === '0000' && data.transactionStatus === 'Completed') {
        return {
          success: true,
          paymentId: request.paymentId,
          providerTransactionId: request.providerTransactionId,
          amount: parseFloat(data.amount),
          status: PaymentStatus.COMPLETED,
          transactionId: data.trxID,
          message: 'Payment completed successfully',
        };
      } else if (data.statusCode === '2031' || data.statusCode === '2025') {
        // Payment cancelled or failed
        return {
          success: false,
          paymentId: request.paymentId,
          providerTransactionId: request.providerTransactionId,
          status: PaymentStatus.CANCELLED,
          message: data.statusMessage || 'Payment cancelled',
        };
      } else {
        return {
          success: false,
          paymentId: request.paymentId,
          providerTransactionId: request.providerTransactionId,
          status: PaymentStatus.FAILED,
          message: data.statusMessage || 'Payment execution failed',
        };
      }
    } catch (error: any) {
      console.error('bKash execute payment error:', error.response?.data || error.message);

      return {
        success: false,
        paymentId: request.paymentId,
        providerTransactionId: request.providerTransactionId,
        status: PaymentStatus.FAILED,
        message: error.response?.data?.statusMessage || 'Payment execution failed',
      };
    }
  }

  /**
   * Query payment status from bKash
   */
  async queryPayment(request: QueryPaymentRequest): Promise<QueryPaymentResponse> {
    const token = await this.getGrantToken();
    const config = this.getConfig();

    try {
      const response = await this.axiosClient.post<BkashQueryResponse>(
        '/tokenized/checkout/payment/status',
        {
          paymentID: request.providerTransactionId,
        },
        {
          headers: {
            Authorization: token,
            'x-app-key': config.appKey,
          },
        },
      );

      const data = response.data;

      let status: PaymentStatus;
      if (data.transactionStatus === 'Completed') {
        status = PaymentStatus.COMPLETED;
      } else if (data.transactionStatus === 'Cancelled') {
        status = PaymentStatus.CANCELLED;
      } else if (data.transactionStatus === 'Failed') {
        status = PaymentStatus.FAILED;
      } else {
        status = PaymentStatus.PROCESSING;
      }

      return {
        paymentId: request.paymentId,
        providerTransactionId: request.providerTransactionId,
        amount: parseFloat(data.amount),
        status,
        transactionId: data.trxID,
        completedAt: data.completedTime ? new Date(data.completedTime) : undefined,
        metadata: {
          transactionStatus: data.transactionStatus,
          merchantInvoiceNumber: data.merchantInvoiceNumber,
        },
      };
    } catch (error: any) {
      console.error('bKash query payment error:', error.response?.data || error.message);
      throw new BadRequestException('Failed to query bKash payment');
    }
  }

  /**
   * Refund payment
   */
  async refundPayment(request: RefundPaymentRequest): Promise<RefundPaymentResponse> {
    const token = await this.getGrantToken();
    const config = this.getConfig();

    try {
      // First get the payment details to find the transaction ID
      const queryResponse = await this.queryPayment({
        paymentId: request.paymentId,
        providerTransactionId: '', // Will be populated by queryPayment
      });

      const trxId = queryResponse.transactionId;
      if (!trxId) {
        throw new BadRequestException('No transaction ID found for refund');
      }

      const refundAmount = request.amount || queryResponse.amount;

      const response = await this.axiosClient.post<BkashRefundResponse>(
        '/tokenized/checkout/payment/refund',
        {
          paymentID: request.paymentId,
          trxID: trxId,
          amount: refundAmount.toString(),
          reason: request.reason || 'Customer refund',
          sku: 'REFUND',
        },
        {
          headers: {
            Authorization: token,
            'x-app-key': config.appKey,
          },
        },
      );

      const data = response.data;

      if (data.statusCode === '0000' || data.transactionStatus === 'Completed') {
        return {
          success: true,
          refundId: data.transactionId,
          amount: parseFloat(data.amount),
          message: 'Refund processed successfully',
        };
      } else {
        return {
          success: false,
          amount: refundAmount,
          message: data.status || 'Refund failed',
        };
      }
    } catch (error: any) {
      console.error('bKash refund error:', error.response?.data || error.message);
      return {
        success: false,
        amount: request.amount || 0,
        message: error.response?.data?.statusMessage || 'Refund failed',
      };
    }
  }

  /**
   * Verify webhook signature (bKash doesn't use webhooks, this is for future compatibility)
   */
  verifyWebhookSignature(data: any, signature: string): boolean {
    // bKash doesn't use webhook signatures
    // This is a placeholder for future compatibility
    return true;
  }
}
