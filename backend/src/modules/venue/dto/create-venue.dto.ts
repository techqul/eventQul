import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
  IsArray,
  IsObject,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateVenueDto {
  @ApiProperty({ example: 'bangabandhu-international-conference-center' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  slug!: string;

  @ApiProperty({ example: 'Bangabandhu International Conference Center' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 'Sher-e-Bangla Nagar, Agargaon, Dhaka' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  address!: string;

  @ApiProperty({ example: 'Dhaka' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  city!: string;

  @ApiProperty({ example: 'Agargaon' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  area!: string;

  @ApiProperty({ example: 2000 })
  @IsNumber()
  @Max(100000)
  capacity!: number;

  @ApiPropertyOptional({ example: 'https://example.com/map-image.jpg' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  mapImage?: string;

  @ApiPropertyOptional({ example: ['parking', 'ac', 'wifi', 'food-court'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  facilities?: string[];

  @ApiPropertyOptional({
    example: { lat: 23.7697, lng: 90.3685 },
    description: 'GPS coordinates for the venue'
  })
  @IsObject()
  @IsOptional()
  coordinates?: {
    lat: number;
    lng: number;
  };
}
