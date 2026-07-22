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
    title: string;
    description: string;
    longDescription?: string;
    coverImage?: string;
    gallery?: string[];
    startDate: string;
    endDate: string;
    timezone: string;
    organizerSlug: string;
    venueSlug: string;
    categorySlug: string;
    capacity: number;
    status?: EventStatus;
    featured?: boolean;
    trending?: boolean;
    tags?: string[];
    ticketTypes?: CreateTicketTypeDto[];
}
