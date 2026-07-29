import { Repository, DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { Ticket } from './entities/ticket.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { TicketType } from '../event/entities/ticket-type.entity';
import { Event } from '../event/entities/event.entity';
import { OrderStatus } from './types/order-status.enum';
import { OtpService } from '../otp/otp.service';
export interface PaginatedResult<T> {
    data: T[];
    page: number;
    size: number;
    total: number;
}
export interface SerializedTicket {
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
export interface SerializedOrder {
    id: string;
    userId: string;
    orderNumber: string;
    subtotal: number;
    discount: number;
    total: number;
    status: string;
    couponCode: string | null;
    paymentMethod: string | null;
    paymentStatus: string;
    paidAt: string | null;
    tickets: SerializedTicket[];
    createdAt: string;
    updatedAt: string;
}
export declare class OrdersService {
    private readonly orderRepository;
    private readonly ticketRepository;
    private readonly ticketTypeRepository;
    private readonly eventRepository;
    private dataSource;
    private readonly otpService;
    private readonly logger;
    constructor(orderRepository: Repository<Order>, ticketRepository: Repository<Ticket>, ticketTypeRepository: Repository<TicketType>, eventRepository: Repository<Event>, dataSource: DataSource, otpService: OtpService);
    create(userId: string, createOrderDto: CreateOrderDto): Promise<SerializedOrder>;
    findAll(page?: number, limit?: number): Promise<PaginatedResult<Order>>;
    findByUser(userId: string, page?: number, limit?: number): Promise<PaginatedResult<Order>>;
    findOne(id: string): Promise<Order>;
    findByOrderNumber(orderNumber: string): Promise<Order | null>;
    updateStatus(id: string, status: OrderStatus): Promise<Order>;
    verifyTicket(qrCode: string): Promise<Ticket>;
    checkInTicket(qrCode: string): Promise<Ticket>;
    getUserTickets(userId: string): Promise<Ticket[]>;
    private generateOrderNumber;
    private generateQRCode;
    cancelOrder(id: string): Promise<Order>;
    private toOrderResponse;
    private toTicketResponse;
}
