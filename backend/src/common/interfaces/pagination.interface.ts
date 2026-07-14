import { Type } from 'class-transformer';
import { IsOptional, IsInt, IsPositive, Max, IsIn, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQuery } from './response.interface';

/**
 * Pagination DTO for list endpoints
 * Provides consistent pagination across all list queries
 */
export class PaginationDto implements PaginationQuery {
  @ApiPropertyOptional({
    description: 'Page number (starts from 1)',
    example: 1,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    example: 20,
    minimum: 1,
    maximum: 100,
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({
    description: 'Sort by field name',
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Sort order',
    example: 'DESC',
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';

  /**
   * Get offset for database query
   */
  getOffset(): number {
    const page = this.page || 1;
    const limit = this.limit || 20;
    return (page - 1) * limit;
  }

  /**
   * Get pagination values with defaults
   */
  getValues(): { page: number; limit: number; offset: number } {
    const page = this.page || 1;
    const limit = Math.min(this.limit || 20, 100); // Max 100 per request
    const offset = (page - 1) * limit;

    return { page, limit, offset };
  }
}

/**
 * Pagination result wrapper
 */
export interface PaginationResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

/**
 * Create a paginated response
 */
export function createPaginationResponse<T>(
  data: T[],
  total: number,
  pagination: PaginationDto,
): PaginationResult<T> {
  const { page, limit } = pagination.getValues();
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };
}
