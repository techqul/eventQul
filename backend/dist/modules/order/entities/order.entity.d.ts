import { User } from '../../users/entities/user.entity';
import { Ticket } from './ticket.entity';
import { OrderStatus } from '../types/order-status.enum';
export declare class Order {
    id: string;
    user: User;
    userId: string;
    tickets: Ticket[];
    orderNumber: string;
    subtotal: number;
    discount: number;
    total: number;
    status: OrderStatus;
    couponCode?: string;
    paymentMethod?: string;
    paymentStatus: string;
    paidAt?: Date;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}
