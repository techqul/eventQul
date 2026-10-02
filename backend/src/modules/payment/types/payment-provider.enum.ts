/**
 * Payment Provider Enum
 * Defines all available payment gateway providers
 */
export enum PaymentProvider {
  BKASH = 'bkash',
  SSLCOMMERZ = 'sslcommerz',
  CASH = 'cash',
}

/**
 * Payment Status Enum
 * Tracks the status of payment transactions
 */
export enum PaymentStatus {
  PENDING = 'pending',
  INITIATED = 'initiated',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  EXPIRED = 'expired',
}

/**
 * Payment Method Enum
 * Different payment methods available
 */
export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  MOBILE_BANKING = 'mobile_banking',
  INTERNET_BANKING = 'internet_banking',
  CASH_ON_DELIVERY = 'cash_on_delivery',
  WALLET = 'wallet',
}

/**
 * Currency Enum
 * Supported currencies for payments
 */
export enum Currency {
  BDT = 'BDT',
  USD = 'USD',
}
