import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
export declare const validationPipeOptions: {
    whitelist: boolean;
    forbidNonWhitelisted: boolean;
    transform: boolean;
    transformOptions: {
        enableImplicitConversion: boolean;
    };
    exceptionFactory: (errors: ValidationError[]) => BadRequestException;
};
export declare const GlobalValidationPipe: ValidationPipe;
