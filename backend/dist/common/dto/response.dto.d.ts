export declare class ResponseDto<T = any> {
    success: boolean;
    message: string;
    data?: T;
    errors?: any[];
    statusCode?: number;
}
export declare class PaginationResponseDto<T = any> {
    success: boolean;
    message: string;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
