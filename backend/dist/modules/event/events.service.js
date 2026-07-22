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
var EventsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("./entities/event.entity");
const ticket_type_entity_1 = require("./entities/ticket-type.entity");
const organizer_entity_1 = require("../organizer/entities/organizer.entity");
const venue_entity_1 = require("../venue/entities/venue.entity");
const category_entity_1 = require("../category/entities/category.entity");
let EventsService = EventsService_1 = class EventsService {
    eventRepository;
    ticketTypeRepository;
    organizerRepository;
    venueRepository;
    categoryRepository;
    logger = new common_1.Logger(EventsService_1.name);
    constructor(eventRepository, ticketTypeRepository, organizerRepository, venueRepository, categoryRepository) {
        this.eventRepository = eventRepository;
        this.ticketTypeRepository = ticketTypeRepository;
        this.organizerRepository = organizerRepository;
        this.venueRepository = venueRepository;
        this.categoryRepository = categoryRepository;
    }
    async create(createEventDto, organizerId) {
        const existingEvent = await this.eventRepository.findOne({
            where: { slug: createEventDto.slug },
        });
        if (existingEvent) {
            throw new common_1.ConflictException('Event with this slug already exists');
        }
        const organizer = await this.organizerRepository.findOne({
            where: { slug: createEventDto.organizerSlug },
        });
        if (!organizer) {
            throw new common_1.NotFoundException('Organizer not found');
        }
        const venue = await this.venueRepository.findOne({
            where: { slug: createEventDto.venueSlug },
        });
        if (!venue) {
            throw new common_1.NotFoundException('Venue not found');
        }
        const category = await this.categoryRepository.findOne({
            where: { slug: createEventDto.categorySlug },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        if (organizer.userId !== organizerId) {
            throw new common_1.ConflictException('You can only create events for your own organizer profile');
        }
        const event = this.eventRepository.create({
            ...createEventDto,
            organizerId: organizer.id,
            venueId: venue.id,
            categoryId: category.id,
            startDate: new Date(createEventDto.startDate),
            endDate: new Date(createEventDto.endDate),
        });
        const savedEvent = await this.eventRepository.save(event);
        if (createEventDto.ticketTypes && createEventDto.ticketTypes.length > 0) {
            const ticketTypes = createEventDto.ticketTypes.map((tt) => this.ticketTypeRepository.create({
                ...tt,
                eventId: savedEvent.id,
            }));
            await this.ticketTypeRepository.save(ticketTypes);
        }
        await this.organizerRepository.increment({ id: organizer.id }, 'totalEvents', 1);
        await this.categoryRepository.increment({ id: category.id }, 'eventCount', 1);
        this.logger.log(`Event created successfully: ${savedEvent.slug}`);
        return this.findOne(savedEvent.id);
    }
    async findAll(page = 1, limit = 20, filters) {
        const queryBuilder = this.eventRepository
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.organizer', 'organizer')
            .leftJoinAndSelect('event.venue', 'venue')
            .leftJoinAndSelect('event.category', 'category')
            .leftJoinAndSelect('event.ticketTypes', 'ticketTypes');
        if (filters) {
            if (filters.search) {
                queryBuilder.andWhere('(event.title ILIKE :search OR event.description ILIKE :search)', { search: `%${filters.search}%` });
            }
            if (filters.category) {
                queryBuilder.andWhere('category.slug = :category', { category: filters.category });
            }
            if (filters.status) {
                queryBuilder.andWhere('event.status = :status', { status: filters.status });
            }
            if (filters.featured === 'true') {
                queryBuilder.andWhere('event.featured = :featured', { featured: true });
            }
            if (filters.trending === 'true') {
                queryBuilder.andWhere('event.trending = :trending', { trending: true });
            }
        }
        const [events, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('event.startDate', 'ASC')
            .getManyAndCount();
        return {
            data: events,
            page,
            size: limit,
            total,
        };
    }
    async findOne(id) {
        const event = await this.eventRepository.findOne({
            where: { id },
            relations: { organizer: true, venue: true, category: true, ticketTypes: true },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        return event;
    }
    async findBySlug(slug) {
        return this.eventRepository.findOne({
            where: { slug },
            relations: { organizer: true, venue: true, category: true, ticketTypes: true },
        });
    }
    async update(id, updateEventDto) {
        const event = await this.findOne(id);
        if (updateEventDto.slug && updateEventDto.slug !== event.slug) {
            const existingEvent = await this.eventRepository.findOne({
                where: { slug: updateEventDto.slug },
            });
            if (existingEvent) {
                throw new common_1.ConflictException('Event with this slug already exists');
            }
        }
        if (updateEventDto.startDate) {
            updateEventDto.startDate = new Date(updateEventDto.startDate);
        }
        if (updateEventDto.endDate) {
            updateEventDto.endDate = new Date(updateEventDto.endDate);
        }
        Object.assign(event, updateEventDto);
        const updatedEvent = await this.eventRepository.save(event);
        this.logger.log(`Event updated successfully: ${updatedEvent.slug}`);
        return this.findOne(updatedEvent.id);
    }
    async remove(id) {
        const event = await this.eventRepository.findOneBy({ id });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        await this.eventRepository.softDelete(id);
        this.logger.log(`Event soft deleted: ${id}`);
    }
    async addTicketType(eventId, createTicketTypeDto) {
        const event = await this.findOne(eventId);
        const ticketType = this.ticketTypeRepository.create({
            ...createTicketTypeDto,
            eventId,
        });
        return this.ticketTypeRepository.save(ticketType);
    }
    async updateTicketType(id, updateTicketTypeDto) {
        const ticketType = await this.ticketTypeRepository.findOne({
            where: { id },
        });
        if (!ticketType) {
            throw new common_1.NotFoundException('Ticket type not found');
        }
        Object.assign(ticketType, updateTicketTypeDto);
        return this.ticketTypeRepository.save(ticketType);
    }
    async removeTicketType(id) {
        const ticketType = await this.ticketTypeRepository.findOneBy({ id });
        if (!ticketType) {
            throw new common_1.NotFoundException('Ticket type not found');
        }
        await this.ticketTypeRepository.delete(id);
    }
    async incrementSoldTickets(eventId, count) {
        await this.eventRepository.increment({ id: eventId }, 'soldTickets', count);
    }
    async decrementSoldTickets(eventId, count) {
        await this.eventRepository.decrement({ id: eventId }, 'soldTickets', count);
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = EventsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(1, (0, typeorm_1.InjectRepository)(ticket_type_entity_1.TicketType)),
    __param(2, (0, typeorm_1.InjectRepository)(organizer_entity_1.Organizer)),
    __param(3, (0, typeorm_1.InjectRepository)(venue_entity_1.Venue)),
    __param(4, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EventsService);
//# sourceMappingURL=events.service.js.map