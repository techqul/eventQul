import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
  IsArray,
  IsDate,
  IsBoolean,
  ValidateNested,
  Min,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { EventStatus } from '../types/event-status.enum';

export class CreateTicketTypeDto {
  @ApiProperty({ example: 'General Admission' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @ApiPropertyOptional({ example: 'Standard entry ticket' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ example: 500.0 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiPropertyOptional({ example: 'BDT', default: 'BDT' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(1)
  available!: number;

  @ApiPropertyOptional({ example: 10, default: 10 })
  @IsNumber()
  @IsOptional()
  maxPerPurchase?: number;

  @ApiPropertyOptional({ example: ['Priority seating', 'Free drink'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  benefits?: string[];
}

export class CreateEventDto {
  @ApiProperty({ example: 'tech-conference-2024' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  slug!: string;

  @ApiProperty({ example: 'tech-organizer' })
  @IsString()
  @IsNotEmpty()
  organizerSlug!: string;

  @ApiProperty({ example: 'convention-center' })
  @IsString()
  @IsNotEmpty()
  venueSlug!: string;

  @ApiProperty({ example: 'technology' })
  @IsString()
  @IsNotEmpty()
  categorySlug!: string;

  @ApiProperty({ example: 'Tech Conference 2024' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(200)
  title!: string;

  @ApiProperty({ example: 'Annual technology conference' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description!: string;

  @ApiPropertyOptional({
    example: 'Join us for the biggest tech event of the year',
  })
  @IsString()
  @IsOptional()
  @MaxLength(2000)
  longDescription?: string;

  @ApiPropertyOptional({ example: 'https://example.com/cover.jpg' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  coverImage?: string;

  @ApiPropertyOptional({ example: ['img1.jpg', 'img2.jpg'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  gallery?: string[];

  @ApiProperty({ example: '2024-12-01T09:00:00.000Z' })
  @IsDate()
  @Type(() => Date)
  startDate!: Date;

  @ApiProperty({ example: '2024-12-01T17:00:00.000Z' })
  @IsDate()
  @Type(() => Date)
  endDate!: Date;

  @ApiProperty({ example: 'Asia/Dhaka' })
  @IsString()
  @IsNotEmpty()
  timezone!: string;

  @ApiProperty({ example: 500 })
  @IsNumber()
  @Min(1)
  capacity!: number;

  @ApiPropertyOptional({ example: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  soldTickets?: number;

  @ApiPropertyOptional({ enum: EventStatus, default: EventStatus.UPCOMING })
  @IsEnum(EventStatus)
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

  @ApiPropertyOptional({ example: ['tech', 'conference', 'innovation'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ type: [CreateTicketTypeDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTicketTypeDto)
  @IsOptional()
  ticketTypes?: CreateTicketTypeDto[];
}
