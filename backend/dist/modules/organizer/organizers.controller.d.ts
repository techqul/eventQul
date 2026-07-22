import { OrganizersService } from './organizers.service';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';
export declare class OrganizersController {
    private readonly organizersService;
    constructor(organizersService: OrganizersService);
    create(user: any, createOrganizerDto: CreateOrganizerDto): Promise<import("./entities/organizer.entity").Organizer>;
    findAll(page?: string, limit?: string): Promise<import("./organizers.service").PaginatedResult<import("./entities/organizer.entity").Organizer>>;
    findOne(slug: string): Promise<import("./entities/organizer.entity").Organizer | null>;
    update(slug: string, updateOrganizerDto: UpdateOrganizerDto): Promise<import("./entities/organizer.entity").Organizer>;
    remove(slug: string): Promise<{
        success: boolean;
    }>;
    verifyOrganizer(slug: string): Promise<import("./entities/organizer.entity").Organizer>;
}
