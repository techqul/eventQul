import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
export declare class TransformInterceptor<T> implements NestInterceptor<T, any> {
    private reflector?;
    private readonly logger;
    constructor(reflector?: Reflector | undefined);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private extractMeta;
}
export declare class ExcludeFieldsInterceptor implements NestInterceptor {
    private readonly logger;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private excludeSensitiveFields;
}
