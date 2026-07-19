import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const message =
      this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) || 'Success';

    return next.handle().pipe(
      map((response: any) => {
        // PAGINATED RESPONSE
        if (response && typeof response === 'object' && 'data' in response && 'total' in response) {
          return {
            success: true,
            message,
            data: response.data,
            meta: {
              page: response.page ?? 0,
              limit: response.size ?? 0,
              total: response.total,
              totalPages: Math.ceil(response.total / response.size),
            },
          };
        }

        // NORMAL RESPONSE
        return {
          success: true,
          message,
          data: response ?? {},
        };
      }),
    );
  }
}
