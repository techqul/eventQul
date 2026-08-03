import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
  Max,
  IsObject,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrganizerDto {
  @ApiProperty({ example: 'tech-events-bd' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens',
  })
  slug!: string;

  

  @ApiProperty({ example: 'Tech Events Bangladesh' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.jpg' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  logo?: string;

  @ApiPropertyOptional({ example: 'https://example.com/banner.jpg' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  banner?: string;

  @ApiPropertyOptional({
    example: 'Leading tech event organizer in Bangladesh',
    description: 'Organization description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: {
      facebook: 'https://fb.com/techevents',
      instagram: 'https://instagram.com/techevents',
    },
    description: 'Social media links',
  })
  @IsObject()
  @IsOptional()
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}
