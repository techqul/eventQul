import { EventStatus } from '../types/event-status.enum';
export declare class CreateTicketTypeDto {
    name: string;
    description?: string;
    price: number;
    currency?: string;
    available: number;
    maxPerPurchase?: number;
    benefits?: string[];
}
export declare class CreateEventDto {
    slug: string;
    organizerSlug: string;
    venueSlug: string;
    categorySlug: string;
    title: string;
    description: string;
    longDescription?: string;
    coverImage?: string;
    gallery?: string[];
    startDate: Date;
    endDate: Date;
    timezone: string;
    capacity: number;
    soldTickets?: number;
    status?: EventStatus;
    featured?: boolean;
    trending?: boolean;
    tags?: string[];
    ticketTypes?: CreateTicketTypeDto[];
}
