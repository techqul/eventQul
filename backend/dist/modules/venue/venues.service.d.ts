import { Repository } from 'typeorm';
import { Venue } from './entities/venue.entity';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
export interface PaginatedResult<T> {
    data: T[];
    page: number;
    size: number;
    total: number;
}
export declare class VenuesService {
    private readonly venueRepository;
    private readonly logger;
    constructor(venueRepository: Repository<Venue>);
    create(createVenueDto: CreateVenueDto): Promise<Venue>;
    findAll(page?: number, limit?: number): Promise<PaginatedResult<Venue>>;
    findOne(id: string): Promise<Venue>;
    findBySlug(slug: string): Promise<Venue | null>;
    update(id: string, updateVenueDto: UpdateVenueDto): Promise<Venue>;
    remove(id: string): Promise<void>;
}
