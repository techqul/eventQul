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
var OrganizersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const organizer_entity_1 = require("./entities/organizer.entity");
let OrganizersService = OrganizersService_1 = class OrganizersService {
    organizerRepository;
    logger = new common_1.Logger(OrganizersService_1.name);
    constructor(organizerRepository) {
        this.organizerRepository = organizerRepository;
    }
    async create(userId, createOrganizerDto) {
        const existingOrganizer = await this.organizerRepository.findOne({
            where: { userId },
        });
        if (existingOrganizer) {
            throw new common_1.ConflictException('User already has an organizer profile');
        }
        const slugExists = await this.organizerRepository.findOne({
            where: { slug: createOrganizerDto.slug },
        });
        if (slugExists) {
            throw new common_1.ConflictException('Organizer with this slug already exists');
        }
        const organizer = this.organizerRepository.create({
            ...createOrganizerDto,
            userId,
        });
        const savedOrganizer = await this.organizerRepository.save(organizer);
        this.logger.log(`Organizer created successfully: ${savedOrganizer.slug}`);
        return savedOrganizer;
    }
    async findAll(page = 1, limit = 20) {
        const [organizers, total] = await this.organizerRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { name: 'ASC' },
            relations: { user: true },
        });
        return {
            data: organizers,
            page,
            size: limit,
            total,
        };
    }
    async findOne(id) {
        const organizer = await this.organizerRepository.findOne({
            where: { id },
            relations: { user: true },
        });
        if (!organizer) {
            throw new common_1.NotFoundException('Organizer not found');
        }
        return organizer;
    }
    async findBySlug(slug) {
        return this.organizerRepository.findOne({
            where: { slug },
            relations: { user: true },
        });
    }
    async findByUserId(userId) {
        return this.organizerRepository.findOne({
            where: { userId },
        });
    }
    async update(id, updateOrganizerDto) {
        const organizer = await this.findOne(id);
        if (updateOrganizerDto.slug && updateOrganizerDto.slug !== organizer.slug) {
            const existingOrganizer = await this.organizerRepository.findOne({
                where: { slug: updateOrganizerDto.slug },
            });
            if (existingOrganizer) {
                throw new common_1.ConflictException('Organizer with this slug already exists');
            }
        }
        Object.assign(organizer, updateOrganizerDto);
        const updatedOrganizer = await this.organizerRepository.save(organizer);
        this.logger.log(`Organizer updated successfully: ${updatedOrganizer.slug}`);
        return updatedOrganizer;
    }
    async remove(id) {
        const organizer = await this.organizerRepository.findOneBy({ id });
        if (!organizer) {
            throw new common_1.NotFoundException('Organizer not found');
        }
        await this.organizerRepository.delete(id);
        this.logger.log(`Organizer deleted: ${id}`);
    }
    async verifyOrganizer(id) {
        const organizer = await this.findOne(id);
        organizer.isVerified = true;
        const updatedOrganizer = await this.organizerRepository.save(organizer);
        this.logger.log(`Organizer verified: ${id}`);
        return updatedOrganizer;
    }
    async incrementEventCount(organizerId) {
        await this.organizerRepository.increment({ id: organizerId }, 'totalEvents', 1);
    }
    async decrementEventCount(organizerId) {
        await this.organizerRepository.decrement({ id: organizerId }, 'totalEvents', 1);
    }
};
exports.OrganizersService = OrganizersService;
exports.OrganizersService = OrganizersService = OrganizersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organizer_entity_1.Organizer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrganizersService);
//# sourceMappingURL=organizers.service.js.map