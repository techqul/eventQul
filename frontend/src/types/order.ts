export type OrderStatus = "pending" | "confirmed" | "cancelled" | "refunded";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export interface TicketItem {
  ticketTypeId: string;
  quantity: number;
}

export interface CreateOrderInput {
  tickets: TicketItem[];
  couponCode?: string;
  paymentMethod?: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
}

// Clean order ticket response from API
export interface OrderTicket {
  id: string;
  orderId: string;
  eventId: string;
  eventTitle: string | null;
  eventDate: string | null;
  eventCoverImage: string | null;
  ticketTypeId: string;
  ticketTypeName: string | null;
  ticketPrice: string;
  qrCode: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  status: string;
  checkedInAt: string | null;
  createdAt: string;
}

// Clean order response from API
export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  couponCode: string | null;
  paymentMethod: string | null;
  paymentStatus: PaymentStatus;
  paidAt: string | null;
  tickets: OrderTicket[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: Order;
}

export interface OrdersResponse {
  success: boolean;
  message: string;
  data: Order[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
