export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  available: number;
  maxPerPurchase: number;
  benefits: string[];
}

export interface Ticket {
  id: string;
  orderId: string;
  eventId: string;
  eventName: string;
  eventDate: Date;
  eventCoverImage: string;
  ticketType: string;
  quantity: number;
  totalPrice: number;
  purchaseDate: Date;
  status: "confirmed" | "pending" | "cancelled" | "used";
  qrCode: string;
  attendee: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface Order {
  id: string;
  tickets: Ticket[];
  subtotal: number;
  discount: number;
  total: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
  couponCode?: string;
}
