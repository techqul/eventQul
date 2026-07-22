import { BaseEntity } from '../../../common/entities/base.entity';
import { Order } from './order.entity';
import { Event } from '../../event/entities/event.entity';
import { TicketType } from '../../event/entities/ticket-type.entity';
import { TicketStatus } from '../types/order-status.enum';
export declare class Ticket extends BaseEntity {
    id: string;
    order: Order;
    orderId: string;
    event: Event;
    eventId: string;
    ticketType: TicketType;
    ticketTypeId: string;
    qrCode: string;
    attendeeName: string;
    attendeeEmail: string;
    attendeePhone: string;
    status: TicketStatus;
    checkedInAt?: Date;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}
