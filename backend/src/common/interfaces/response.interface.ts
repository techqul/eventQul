/**
 * Standard API Response interface
 * All API responses should follow this structure for consistency
 */

/**
 * Success response interface
 */
export interface ApiResponse<T = any> {
  success: true;
  message?: string;
  data: T;
  meta?: ResponseMeta;
}

/**
 * Error response interface
 */
export interface ApiError {
  success: false;
  message: string;
  errors?: ValidationError[];
  statusCode: number;
  stack?: string; // Only included in development mode
}

/**
 * Validation error detail
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Pagination metadata
 */
export interface ResponseMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

/**
 * Pagination query parameters
 */
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

/**
 * Filter query parameters
 */
export interface FilterQuery {
  search?: string;
  status?: string | string[];
  category?: string | string[];
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Create a success response
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  meta?: ResponseMeta,
): ApiResponse<T> {
  const response: ApiResponse<T> = {
    success: true,
    data,
  };

  if (message) {
    response.message = message;
  }

  if (meta) {
    response.meta = meta;
  }

  return response;
}

/**
 * Create an error response
 */
export function createErrorResponse(
  message: string,
  statusCode: number = 500,
  errors?: ValidationError[],
): ApiError {
  const error: ApiError = {
    success: false,
    message,
    statusCode,
  };

  if (errors && errors.length > 0) {
    error.errors = errors;
  }

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    error.stack = new Error().stack;
  }

  return error;
}

/**
 * Create a validation error response
 */
export function createValidationErrorResponse(errors: ValidationError[]): ApiError {
  return {
    success: false,
    message: 'Validation failed',
    errors,
    statusCode: 400,
  };
}

/**
 * Calculate pagination metadata
 */
export function calculatePaginationMeta(page: number, limit: number, total: number): ResponseMeta {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
}
