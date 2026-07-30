import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(user: any, createOrderDto: CreateOrderDto): Promise<import("./orders.service").SerializedOrder>;
    findAll(user: any, page?: number, limit?: number): Promise<import("./orders.service").PaginatedResult<import("./entities/order.entity").Order>>;
    getMyTickets(user: any): Promise<import("./entities/ticket.entity").Ticket[]>;
    findOne(orderNumber: string): Promise<import("./entities/order.entity").Order | null>;
    updateStatus(orderNumber: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<import("./entities/order.entity").Order>;
    cancelOrder(orderNumber: string, user: any): Promise<import("./entities/order.entity").Order>;
}
export declare class TicketsController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    verifyTicket(qrCode: string): Promise<import("./entities/ticket.entity").Ticket>;
    checkInTicket(qrCode: string): Promise<import("./entities/ticket.entity").Ticket>;
}
