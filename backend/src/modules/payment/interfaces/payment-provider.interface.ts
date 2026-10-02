import { PaymentProvider, PaymentStatus } from '../types/payment-provider.enum';

/**
 * Create Payment Request
 */
export interface CreatePaymentRequest {
  payerReference: string;
  amount: number;
  currency?: string;
  callbackUrl?: string;
  merchantInvoiceNumber?: string;
  metadata?: Record<string, any>;
}

/**
 * Create Payment Response
 */
export interface CreatePaymentResponse {
  success: boolean;
  paymentId: string;
  orderId?: string;
  redirectUrl?: string;
  providerTransactionId?: string;
  amount?: number;
  expiresAt?: Date;
  message?: string;
}

/**
 * Execute Payment Request
 */
export interface ExecutePaymentRequest {
  paymentId: string;
  providerTransactionId: string;
}

/**
 * Execute Payment Response
 */
export interface ExecutePaymentResponse {
  success: boolean;
  paymentId: string;
  providerTransactionId: string;
  amount?: number;
  status: PaymentStatus;
  transactionId?: string;
  message?: string;
}

/**
 * Query Payment Request
 */
export interface QueryPaymentRequest {
  paymentId: string;
  providerTransactionId: string;
}

/**
 * Query Payment Response
 */
export interface QueryPaymentResponse {
  paymentId: string;
  providerTransactionId: string;
  amount: number;
  status: PaymentStatus;
  transactionId?: string;
  completedAt?: Date;
  metadata?: Record<string, any>;
}

/**
 * Refund Payment Request
 */
export interface RefundPaymentRequest {
  paymentId: string;
  amount?: number; // Partial refund if specified, full refund if not
  reason?: string;
}

/**
 * Refund Payment Response
 */
export interface RefundPaymentResponse {
  success: boolean;
  refundId?: string;
  amount: number;
  message?: string;
}

/**
 * Payment Provider Interface
 * All payment gateway providers must implement this interface
 */
export interface IPaymentProvider {
  /**
   * Get provider name
   */
  getProvider(): PaymentProvider;

  /**
   * Initialize payment and get redirect URL
   */
  createPayment(request: CreatePaymentRequest): Promise<CreatePaymentResponse>;

  /**
   * Execute payment after user completes payment on gateway
   */
  executePayment(request: ExecutePaymentRequest): Promise<ExecutePaymentResponse>;

  /**
   * Query payment status from gateway
   */
  queryPayment(request: QueryPaymentRequest): Promise<QueryPaymentResponse>;

  /**
   * Process refund
   */
  refundPayment(request: RefundPaymentRequest): Promise<RefundPaymentResponse>;

  /**
   * Verify webhook/callback signature
   */
  verifyWebhookSignature(data: any, signature: string): boolean;
}
