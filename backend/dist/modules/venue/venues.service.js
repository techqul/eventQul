"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenuesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const venue_entity_1 = require("./entities/venue.entity");
let VenuesService = class VenuesService {
    venueRepository;
    constructor(venueRepository) {
        this.venueRepository = venueRepository;
    }
    async create(createVenueDto) {
        const existingVenue = await this.venueRepository.findOne({
            where: { slug: createVenueDto.slug },
        });
        if (existingVenue) {
            throw new common_1.ConflictException('Venue with this slug already exists');
        }
        const venue = this.venueRepository.create(createVenueDto);
        const savedVenue = await this.venueRepository.save(venue);
        return savedVenue;
    }
    async findAll(page = 1, limit = 20) {
        const [venues, total] = await this.venueRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { name: 'ASC' },
        });
        return {
            data: venues,
            page,
            size: limit,
            total,
        };
    }
    async findOne(id) {
        const venue = await this.venueRepository.findOne({
            where: { id },
        });
        if (!venue) {
            throw new common_1.NotFoundException('Venue not found');
        }
        return venue;
    }
    async findBySlug(slug) {
        return this.venueRepository.findOne({
            where: { slug },
        });
    }
    async update(id, updateVenueDto) {
        const venue = await this.findOne(id);
        if (updateVenueDto.slug && updateVenueDto.slug !== venue.slug) {
            const existingVenue = await this.venueRepository.findOne({
                where: { slug: updateVenueDto.slug },
            });
            if (existingVenue) {
                throw new common_1.ConflictException('Venue with this slug already exists');
            }
        }
        Object.assign(venue, updateVenueDto);
        const updatedVenue = await this.venueRepository.save(venue);
        return updatedVenue;
    }
    async remove(id) {
        const venue = await this.venueRepository.findOneBy({ id });
        if (!venue) {
            throw new common_1.NotFoundException('Venue not found');
        }
        await this.venueRepository.delete(id);
    }
};
exports.VenuesService = VenuesService;
exports.VenuesService = VenuesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(venue_entity_1.Venue)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VenuesService);
//# sourceMappingURL=venues.service.js.map