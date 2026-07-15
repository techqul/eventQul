import { PaginationDto as NestJSPaginationDto } from './pagination.dto';

export * from './pagination.dto';

/**
 * Standard Service Response interface
 * Used for consistent API responses across all services
 */
export interface ServiceResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
