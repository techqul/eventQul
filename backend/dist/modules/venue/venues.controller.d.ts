import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
export declare class VenuesController {
    private readonly venuesService;
    constructor(venuesService: VenuesService);
    create(createVenueDto: CreateVenueDto): Promise<import("./entities/venue.entity").Venue>;
    findAll(page?: string, limit?: string): Promise<import("./venues.service").PaginatedResult<import("./entities/venue.entity").Venue>>;
    findOne(id: string): Promise<import("./entities/venue.entity").Venue>;
    update(id: string, updateVenueDto: UpdateVenueDto): Promise<import("./entities/venue.entity").Venue>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
