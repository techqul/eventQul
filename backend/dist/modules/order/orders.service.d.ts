import { Repository, DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { Ticket } from './entities/ticket.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { TicketType } from '../event/entities/ticket-type.entity';
import { Event } from '../event/entities/event.entity';
import { OrderStatus } from './types/order-status.enum';
export interface PaginatedResult<T> {
    data: T[];
    page: number;
    size: number;
    total: number;
}
export declare class OrdersService {
    private readonly orderRepository;
    private readonly ticketRepository;
    private readonly ticketTypeRepository;
    private readonly eventRepository;
    private dataSource;
    private readonly logger;
    constructor(orderRepository: Repository<Order>, ticketRepository: Repository<Ticket>, ticketTypeRepository: Repository<TicketType>, eventRepository: Repository<Event>, dataSource: DataSource);
    create(userId: string, createOrderDto: CreateOrderDto): Promise<Order>;
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
}
