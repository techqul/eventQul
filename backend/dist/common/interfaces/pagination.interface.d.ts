import { PaginationQuery } from './response.interface';
export declare class PaginationDto implements PaginationQuery {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    getOffset(): number;
    getValues(): {
        page: number;
        limit: number;
        offset: number;
    };
}
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
export declare function createPaginationResponse<T>(data: T[], total: number, pagination: PaginationDto): PaginationResult<T>;
