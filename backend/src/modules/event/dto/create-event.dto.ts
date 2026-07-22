import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
  IsArray,
  IsDateString,
  IsBoolean,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventStatus } from '../types/event-status.enum';

export class CreateTicketTypeDto {
  @ApiProperty({ example: 'VIP' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ example: 'VIP access with front row seating' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 500.00 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: 'BDT' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0)
  available!: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  maxPerPurchase?: number;

  @ApiPropertyOptional({ example: ['priority seating', 'complimentary drinks'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  benefits?: string[];
}

export class CreateEventDto {
  @ApiProperty({ example: 'tech-summit-2024' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(200)
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens',
  })
  slug!: string;

  @ApiProperty({ example: 'Tech Summit 2024' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(200)
  title!: string;

  @ApiProperty({ example: 'The biggest tech conference in Bangladesh' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiPropertyOptional({
    example: 'Join us for a day of networking and learning from industry leaders...',
    description: 'Detailed event description'
  })
  @IsString()
  @IsOptional()
  longDescription?: string;

  @ApiPropertyOptional({ example: 'https://example.com/event-cover.jpg' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  coverImage?: string;

  @ApiPropertyOptional({ example: ['image1.jpg', 'image2.jpg'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  gallery?: string[];

  @ApiProperty({ example: '2024-12-15T10:00:00Z' })
  @IsDateString()
  startDate!: string;

  @ApiProperty({ example: '2024-12-15T18:00:00Z' })
  @IsDateString()
  endDate!: string;

  @ApiProperty({ example: 'Asia/Dhaka' })
  @IsString()
  @IsNotEmpty()
  timezone!: string;

  @ApiProperty({ example: 'tech-summit-2024' })
  @IsString()
  @IsNotEmpty()
  organizerSlug!: string;

  @ApiProperty({ example: 'bangabandhu-international-conference-center' })
  @IsString()
  @IsNotEmpty()
  venueSlug!: string;

  @ApiProperty({ example: 'tech-conferences' })
  @IsString()
  @IsNotEmpty()
  categorySlug!: string;

  @ApiProperty({ example: 500 })
  @IsNumber()
  @Min(1)
  capacity!: number;

  @ApiPropertyOptional({
    enum: EventStatus,
    example: EventStatus.UPCOMING,
  })
  @IsString()
  @IsOptional()
  status?: EventStatus;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  trending?: boolean;

  @ApiPropertyOptional({ example: ['tech', 'innovation', 'networking'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ type: [CreateTicketTypeDto] })
  @IsArray()
  @IsOptional()
  ticketTypes?: CreateTicketTypeDto[];
}
