import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { TicketType } from './entities/ticket-type.entity';
import { CreateEventDto, CreateTicketTypeDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Organizer } from '../organizer/entities/organizer.entity';
import { Venue } from '../venue/entities/venue.entity';
import { Category } from '../category/entities/category.entity';
import { EventStatus } from './types/event-status.enum';

export interface PaginatedResult<T> {
  data: T[];
  page: number;
  size: number;
  total: number;
}

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(TicketType)
    private readonly ticketTypeRepository: Repository<TicketType>,
    @InjectRepository(Organizer)
    private readonly organizerRepository: Repository<Organizer>,
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createEventDto: CreateEventDto, organizerId: string): Promise<Event> {
    // Check if slug already exists
    const existingEvent = await this.eventRepository.findOne({
      where: { slug: createEventDto.slug },
    });

    if (existingEvent) {
      throw new ConflictException('Event with this slug already exists');
    }

    // Find related entities
    const organizer = await this.organizerRepository.findOne({
      where: { slug: createEventDto.organizerSlug },
    });

    if (!organizer) {
      throw new NotFoundException('Organizer not found');
    }

    const venue = await this.venueRepository.findOne({
      where: { slug: createEventDto.venueSlug },
    });

    if (!venue) {
      throw new NotFoundException('Venue not found');
    }

    const category = await this.categoryRepository.findOne({
      where: { slug: createEventDto.categorySlug },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Verify the organizer matches (unless admin)
    if (organizer.userId !== organizerId) {
      throw new ConflictException('You can only create events for your own organizer profile');
    }

    // Create event
    const event = this.eventRepository.create({
      ...createEventDto,
      organizerId: organizer.id,
      venueId: venue.id,
      categoryId: category.id,
      startDate: new Date(createEventDto.startDate),
      endDate: new Date(createEventDto.endDate),
    });

    const savedEvent = await this.eventRepository.save(event);

    // Create ticket types if provided
    if (createEventDto.ticketTypes && createEventDto.ticketTypes.length > 0) {
      const ticketTypes = createEventDto.ticketTypes.map((tt) =>
        this.ticketTypeRepository.create({
          ...tt,
          eventId: savedEvent.id,
        }),
      );
      await this.ticketTypeRepository.save(ticketTypes);
    }

    // Increment counters
    await this.organizerRepository.increment({ id: organizer.id }, 'totalEvents', 1);
    await this.categoryRepository.increment({ id: category.id }, 'eventCount', 1);

    this.logger.log(`Event created successfully: ${savedEvent.slug}`);

    return this.findOne(savedEvent.id);
  }

  async findAll(page = 1, limit = 20, filters?: any): Promise<PaginatedResult<Event>> {
    const queryBuilder = this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.organizer', 'organizer')
      .leftJoinAndSelect('event.venue', 'venue')
      .leftJoinAndSelect('event.category', 'category')
      .leftJoinAndSelect('event.ticketTypes', 'ticketTypes');

    // Apply filters if provided
    if (filters) {
      if (filters.search) {
        queryBuilder.andWhere(
          '(event.title ILIKE :search OR event.description ILIKE :search)',
          { search: `%${filters.search}%` },
        );
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

  async findOne(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: { organizer: true, venue: true, category: true, ticketTypes: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async findBySlug(slug: string): Promise<Event | null> {
    return this.eventRepository.findOne({
      where: { slug },
      relations: { organizer: true, venue: true, category: true, ticketTypes: true },
    });
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);

    // If slug is being updated, check for uniqueness
    if (updateEventDto.slug && updateEventDto.slug !== event.slug) {
      const existingEvent = await this.eventRepository.findOne({
        where: { slug: updateEventDto.slug },
      });

      if (existingEvent) {
        throw new ConflictException('Event with this slug already exists');
      }
    }

    // Handle date updates
    if (updateEventDto.startDate) {
      updateEventDto.startDate = new Date(updateEventDto.startDate) as any;
    }
    if (updateEventDto.endDate) {
      updateEventDto.endDate = new Date(updateEventDto.endDate) as any;
    }

    Object.assign(event, updateEventDto);
    const updatedEvent = await this.eventRepository.save(event);

    this.logger.log(`Event updated successfully: ${updatedEvent.slug}`);

    return this.findOne(updatedEvent.id);
  }

  async remove(id: string): Promise<void> {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    await this.eventRepository.softDelete(id);
    this.logger.log(`Event soft deleted: ${id}`);
  }

  // Ticket Type methods
  async addTicketType(eventId: string, createTicketTypeDto: CreateTicketTypeDto): Promise<TicketType> {
    const event = await this.findOne(eventId);

    const ticketType = this.ticketTypeRepository.create({
      ...createTicketTypeDto,
      eventId,
    });

    return this.ticketTypeRepository.save(ticketType);
  }

  async updateTicketType(id: string, updateTicketTypeDto: any): Promise<TicketType> {
    const ticketType = await this.ticketTypeRepository.findOne({
      where: { id },
    });

    if (!ticketType) {
      throw new NotFoundException('Ticket type not found');
    }

    Object.assign(ticketType, updateTicketTypeDto);
    return this.ticketTypeRepository.save(ticketType);
  }

  async removeTicketType(id: string): Promise<void> {
    const ticketType = await this.ticketTypeRepository.findOneBy({ id });
    if (!ticketType) {
      throw new NotFoundException('Ticket type not found');
    }
    await this.ticketTypeRepository.delete(id);
  }

  async incrementSoldTickets(eventId: string, count: number): Promise<void> {
    await this.eventRepository.increment({ id: eventId }, 'soldTickets', count);
  }

  async decrementSoldTickets(eventId: string, count: number): Promise<void> {
    await this.eventRepository.decrement({ id: eventId }, 'soldTickets', count);
  }
}
