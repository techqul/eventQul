import { apiClient } from '../api-client';
import type {
  CreateOrderInput,
  Order,
  OrderResponse,
  OrdersResponse,
  OrderDetailResponse,
} from '@/types/order';

export const ordersApi = {
  /**
   * Create a new order
   */
  async create(input: CreateOrderInput): Promise<OrderResponse> {
    return apiClient.post<OrderResponse>('/orders', input);
  },

  /**
   * Get user's orders with pagination
   */
  async getMyOrders(page: number = 1, limit: number = 20): Promise<OrdersResponse> {
    return apiClient.get<OrdersResponse>(`/orders?page=${page}&limit=${limit}`);
  },

  /**
   * Get order by order number
   */
  async getByOrderNumber(orderNumber: string): Promise<OrderDetailResponse> {
    return apiClient.get<OrderDetailResponse>(`/orders/${orderNumber}`);
  },

  /**
   * Get user's tickets
   */
  async getMyTickets(): Promise<OrderResponse> {
    return apiClient.get<OrderResponse>('/orders/my-tickets');
  },

  /**
   * Cancel order
   */
  async cancelOrder(orderNumber: string): Promise<OrderResponse> {
    return apiClient.post<OrderResponse>(`/orders/${orderNumber}/cancel`, {});
  },
};
