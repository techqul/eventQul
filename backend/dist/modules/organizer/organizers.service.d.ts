import { Repository } from 'typeorm';
import { Organizer } from './entities/organizer.entity';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';
export interface PaginatedResult<T> {
    data: T[];
    page: number;
    size: number;
    total: number;
}
export declare class OrganizersService {
    private readonly organizerRepository;
    constructor(organizerRepository: Repository<Organizer>);
    create(userId: string, createOrganizerDto: CreateOrganizerDto): Promise<Organizer>;
    findAll(page?: number, limit?: number): Promise<PaginatedResult<Organizer>>;
    findOne(id: string): Promise<Organizer>;
    findBySlug(slug: string): Promise<Organizer | null>;
    findByUserId(userId: string): Promise<Organizer | null>;
    update(id: string, updateOrganizerDto: UpdateOrganizerDto): Promise<Organizer>;
    remove(id: string): Promise<void>;
    verifyOrganizer(id: string): Promise<Organizer>;
    incrementEventCount(organizerId: string): Promise<void>;
    decrementEventCount(organizerId: string): Promise<void>;
}
