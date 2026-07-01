import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
export declare class QueryExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: QueryFailedError, host: ArgumentsHost): void;
    private parseUniqueViolationError;
    private parseForeignKeyViolationError;
}
