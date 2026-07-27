import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
  ) {}

  async create(createVenueDto: CreateVenueDto): Promise<Venue> {
    const existingVenue = await this.venueRepository.findOne({
      where: { slug: createVenueDto.slug },
    });

    if (existingVenue) {
      throw new ConflictException('Venue with this slug already exists');
    }

    const venue = this.venueRepository.create(createVenueDto);
    const savedVenue = await this.venueRepository.save(venue);

    return savedVenue;
  }

  async findAll(page = 1, limit = 20): Promise<PaginatedResult<Venue>> {
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

  async findOne(id: string): Promise<Venue> {
    const venue = await this.venueRepository.findOne({
      where: { id },
    });

    if (!venue) {
      throw new NotFoundException('Venue not found');
    }

    return venue;
  }

  async findBySlug(slug: string): Promise<Venue | null> {
    return this.venueRepository.findOne({
      where: { slug },
    });
  }

  async update(id: string, updateVenueDto: UpdateVenueDto): Promise<Venue> {
    const venue = await this.findOne(id);

    // If slug is being updated, check for uniqueness
    if (updateVenueDto.slug && updateVenueDto.slug !== venue.slug) {
      const existingVenue = await this.venueRepository.findOne({
        where: { slug: updateVenueDto.slug },
      });

      if (existingVenue) {
        throw new ConflictException('Venue with this slug already exists');
      }
    }

    Object.assign(venue, updateVenueDto);
    const updatedVenue = await this.venueRepository.save(venue);

    return updatedVenue;
  }

  async remove(id: string): Promise<void> {
    const venue = await this.venueRepository.findOneBy({ id });
    if (!venue) {
      throw new NotFoundException('Venue not found');
    }
    await this.venueRepository.delete(id);
  }
}
