import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { TicketType } from './entities/ticket-type.entity';
import { CreateEventDto, CreateTicketTypeDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Organizer } from '../organizer/entities/organizer.entity';
import { Venue } from '../venue/entities/venue.entity';
import { Category } from '../category/entities/category.entity';
export interface PaginatedResult<T> {
    data: T[];
    page: number;
    size: number;
    total: number;
}
export declare class EventsService {
    private readonly eventRepository;
    private readonly ticketTypeRepository;
    private readonly organizerRepository;
    private readonly venueRepository;
    private readonly categoryRepository;
    private readonly logger;
    constructor(eventRepository: Repository<Event>, ticketTypeRepository: Repository<TicketType>, organizerRepository: Repository<Organizer>, venueRepository: Repository<Venue>, categoryRepository: Repository<Category>);
    create(createEventDto: CreateEventDto, organizerId: string): Promise<Event>;
    findAll(page?: number, limit?: number, filters?: any): Promise<PaginatedResult<Event>>;
    findOne(id: string): Promise<Event>;
    findBySlug(slug: string): Promise<Event | null>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<Event>;
    remove(id: string): Promise<void>;
    addTicketType(eventId: string, createTicketTypeDto: CreateTicketTypeDto): Promise<TicketType>;
    updateTicketType(id: string, updateTicketTypeDto: any): Promise<TicketType>;
    removeTicketType(id: string): Promise<void>;
    incrementSoldTickets(eventId: string, count: number): Promise<void>;
    decrementSoldTickets(eventId: string, count: number): Promise<void>;
}
