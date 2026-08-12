import { apiClient } from '../api-client';

interface CheckoutItem {
  ticketTypeId: string;
  quantity: number;
}

interface AttendeeInfo {
  name: string;
  email: string;
  phone: string;
}

interface CheckoutRequest {
  tickets: CheckoutItem[];
  attendee: AttendeeInfo;
  provider?: string;
  paymentMethod?: string;
  couponCode?: string;
}

interface CheckoutResponse {
   provider: string;
        paymentMethod: string;
        callbackUrl: string;
        payerReference: string;
        amount: number;
}

interface PaymentStatusResponse {
  id: string;
  orderId: string;
  userId: string;
  provider: string;
  status: string;
  amount: number;
  paymentMethod: string | null;
  providerTransactionId: string | null;
  completedAt: string | null;
  createdAt: string;
  expiresAt: string | null;
}

export const paymentApi = {
  /**
   * Complete checkout flow
   * Creates pending order and initiates payment
   */
  async checkout(input: CheckoutResponse): Promise<any> {
    return apiClient.post<CheckoutResponse>('/payment/create', input);
  },

  /**
   * Get payment status
   */
  async getPaymentStatus(paymentId: string): Promise<PaymentStatusResponse> {
    return apiClient.get<PaymentStatusResponse>(`/payment/status?paymentId=${paymentId}`);
  },

  /**
   * Get order payment status
   */
  async getOrderPaymentStatus(orderId: string): Promise<PaymentStatusResponse[]> {
    return apiClient.get<PaymentStatusResponse[]>(`/payment/order/${orderId}/status`);
  },
};
