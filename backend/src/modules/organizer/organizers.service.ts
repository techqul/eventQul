import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

@Injectable()
export class OrganizersService {
  constructor(
    @InjectRepository(Organizer)
    private readonly organizerRepository: Repository<Organizer>,
  ) {}

  async create(userId: string, createOrganizerDto: CreateOrganizerDto): Promise<Organizer> {

    // Check if slug is already taken
    const slugExists = await this.organizerRepository.findOne({
      where: { slug: createOrganizerDto.slug },
    });

    if (slugExists) {
      throw new ConflictException('Organizer with this slug already exists');
    }

    const organizer = this.organizerRepository.create({
      ...createOrganizerDto,
      userId,
    });

    const savedOrganizer = await this.organizerRepository.save(organizer);

    return savedOrganizer;
  }

  async findAll(page = 1, limit = 20): Promise<PaginatedResult<Organizer>> {
    const [organizers, total] = await this.organizerRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { name: 'DESC' },
      relations: { user: true },
    });

    return {
      data: organizers,
      page,
      size: limit,
      total,
    };
  }

  async findOne(id: string): Promise<Organizer> {
    const organizer = await this.organizerRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!organizer) {
      throw new NotFoundException('Organizer not found');
    }

    return organizer;
  }

  async findBySlug(slug: string): Promise<Organizer | null> {
    return this.organizerRepository.findOne({
      where: { slug },
      relations: { user: true },
    });
  }

  async findByUserId(userId: string): Promise<Organizer | null> {
    return this.organizerRepository.findOne({
      where: { userId },
    });
  }

  async update(id: string, updateOrganizerDto: UpdateOrganizerDto): Promise<Organizer> {
    const organizer = await this.findOne(id);

    // If slug is being updated, check for uniqueness
    if (updateOrganizerDto.slug && updateOrganizerDto.slug !== organizer.slug) {
      const existingOrganizer = await this.organizerRepository.findOne({
        where: { slug: updateOrganizerDto.slug },
      });

      if (existingOrganizer) {
        throw new ConflictException('Organizer with this slug already exists');
      }
    }

    Object.assign(organizer, updateOrganizerDto);
    const updatedOrganizer = await this.organizerRepository.save(organizer);

    return updatedOrganizer;
  }

  async remove(id: string): Promise<void> {
    const organizer = await this.organizerRepository.findOneBy({ id });
    if (!organizer) {
      throw new NotFoundException('Organizer not found');
    }
    await this.organizerRepository.delete(id);
  }

  async verifyOrganizer(id: string): Promise<Organizer> {
    const organizer = await this.findOne(id);


    organizer.isVerified = true;
    const updatedOrganizer = await this.organizerRepository.save(organizer);

    return updatedOrganizer;
  }

  async incrementEventCount(organizerId: string): Promise<void> {
    await this.organizerRepository.increment({ id: organizerId }, 'totalEvents', 1);
  }

  async decrementEventCount(organizerId: string): Promise<void> {
    await this.organizerRepository.decrement({ id: organizerId }, 'totalEvents', 1);
  }
}
