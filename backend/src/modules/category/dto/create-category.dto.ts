import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'concerts' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  slug!: string;

  @ApiProperty({ example: 'Concerts' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @ApiPropertyOptional({ example: 'কনসার্ট' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  nameBengali?: string;

  @ApiPropertyOptional({ example: 'music' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  icon?: string;

  @ApiPropertyOptional({ example: '#FF6B6B' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  color?: string;
}
