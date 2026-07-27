import { Event } from './event.entity';
export declare class TicketType {
    id: string;
    event: Event;
    eventId: string;
    name: string;
    description?: string;
    price: number;
    currency: string;
    available: number;
    maxPerPurchase: number;
    benefits: string[];
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}
