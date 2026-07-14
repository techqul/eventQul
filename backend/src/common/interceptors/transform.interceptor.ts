import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  Optional,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { ResponseMeta } from '../interfaces/response.interface';

/**
 * Transform Interceptor
 * Wraps successful responses in a consistent format
 * All controller responses are automatically wrapped with success: true
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  private readonly logger = new Logger(TransformInterceptor.name);

  constructor(@Optional() private reflector?: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const statusCode = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      map((data) => {
        // Don't transform if already in correct format
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        // Transform successful responses
        const response = {
          success: true,
          message: data?.message || undefined,
          data: data?.data !== undefined ? data.data : data,
          meta: data?.meta || this.extractMeta(data, request),
        };

        // Remove message if it was just added as undefined
        if (!data?.message) {
          delete response.message;
        }

        // Log response in development
        if (process.env.NODE_ENV === 'development') {
          this.logger.log(`${request.method} ${request.url} - Status: ${statusCode}`);
        }

        return response;
      }),
    );
  }

  /**
   * Extract pagination metadata from response
   */
  private extractMeta(data: any, request: any): ResponseMeta | undefined {
    if (!data) return undefined;

    // If data has meta property, return it
    if (data.meta) {
      return data.meta;
    }

    // If data has pagination properties, construct meta
    if (data.page !== undefined || data.limit !== undefined || data.total !== undefined) {
      const page = data.page || 1;
      const limit = data.limit || 20;
      const total = data.total || 0;
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

    return undefined;
  }
}

/**
 * Exclude sensitive fields interceptor
 * Removes sensitive fields from responses
 */
@Injectable()
export class ExcludeFieldsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ExcludeFieldsInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data || typeof data !== 'object') {
          return data;
        }

        // Exclude sensitive fields from user objects
        return this.excludeSensitiveFields(data);
      }),
    );
  }

  private excludeSensitiveFields(obj: any): any {
    if (!obj) return obj;

    const sensitiveFields = ['passwordHash', 'password', 'currentHashedRefreshToken'];

    // Handle arrays
    if (Array.isArray(obj)) {
      return obj.map((item) => this.excludeSensitiveFields(item));
    }

    // Handle single objects
    const result = { ...obj };

    for (const field of sensitiveFields) {
      if (field in result) {
        delete result[field];
      }
    }

    // Recursively process nested objects
    for (const key in result) {
      if (result[key] && typeof result[key] === 'object') {
        result[key] = this.excludeSensitiveFields(result[key]);
      }
    }

    return result;
  }
}
