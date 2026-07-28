import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateTicketTypeDto } from './dto/create-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(user: any, createEventDto: CreateEventDto): Promise<import("./entities/event.entity").Event>;
    findAll(page?: number, limit?: number, search?: string, category?: string, status?: string, featured?: string, trending?: string): Promise<import("./events.service").PaginatedResult<import("./entities/event.entity").Event>>;
    findById(id: string): Promise<import("./entities/event.entity").Event | null>;
    findOne(slug: string): Promise<import("./entities/event.entity").Event | null>;
    update(slug: string, updateEventDto: UpdateEventDto): Promise<import("./entities/event.entity").Event>;
    remove(slug: string): Promise<{
        success: boolean;
    }>;
    addTicketType(slug: string, createTicketTypeDto: CreateTicketTypeDto): Promise<import("./entities/ticket-type.entity").TicketType>;
    getTicketTypes(slug: string): Promise<import("./entities/ticket-type.entity").TicketType[]>;
}
export declare class TicketTypesController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    update(id: string, updateTicketTypeDto: any): Promise<import("./entities/ticket-type.entity").TicketType>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
