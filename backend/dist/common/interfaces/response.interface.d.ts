export interface ApiResponse<T = any> {
    success: true;
    message?: string;
    data: T;
    meta?: ResponseMeta;
}
export interface ApiError {
    success: false;
    message: string;
    errors?: ValidationError[];
    statusCode: number;
    stack?: string;
}
export interface ValidationError {
    field: string;
    message: string;
}
export interface ResponseMeta {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrevious?: boolean;
}
export interface PaginationQuery {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}
export interface FilterQuery {
    search?: string;
    status?: string | string[];
    category?: string | string[];
    dateFrom?: string;
    dateTo?: string;
}
export declare function createSuccessResponse<T>(data: T, message?: string, meta?: ResponseMeta): ApiResponse<T>;
export declare function createErrorResponse(message: string, statusCode?: number, errors?: ValidationError[]): ApiError;
export declare function createValidationErrorResponse(errors: ValidationError[]): ApiError;
export declare function calculatePaginationMeta(page: number, limit: number, total: number): ResponseMeta;
