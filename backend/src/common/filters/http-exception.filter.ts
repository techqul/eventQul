import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { createErrorResponse } from '../interfaces/response.interface';

/**
 * Global HTTP exception filter
 * Catches all HTTP exceptions and formats them consistently
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private configService: ConfigService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.message : 'Internal server error';

    // Log the error
    const isDevelopment = this.configService.get('NODE_ENV') === 'development';

    this.logger.error(
      `${request.method} ${request.url} - Status: ${status} - Message: ${message}`,
      exception instanceof Error && !isDevelopment ? exception.stack : '',
    );

    // Build error response
    const errorResponse = createErrorResponse(message, status);

    // Add validation errors if present
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse() as string | Record<string, any>;

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        // Custom validation pipe format: errors is an array of { field, message }
        if (Array.isArray(exceptionResponse.errors) && exceptionResponse.errors.length > 0) {
          errorResponse.errors = exceptionResponse.errors;
          // Surface the first specific validation message as the user-friendly message
          errorResponse.message = exceptionResponse.errors[0].message;
        }
        // Default NestJS validation format: message is an array of strings
        else if (Array.isArray(exceptionResponse.message) && exceptionResponse.message.length > 0) {
          errorResponse.errors = exceptionResponse.message.map((msg: string) => {
            const [field, ...messageParts] = msg.split(' ');
            return {
              field,
              message: messageParts.join(' '),
            };
          });
          // Surface the first specific validation message as the user-friendly message
          errorResponse.message = exceptionResponse.message[0];
        }
      }
    }

    // Include stack trace in development
    if (isDevelopment && exception instanceof Error) {
      errorResponse.stack = exception.stack;
    }

    // Send response
    response.status(status).json(errorResponse);
  }
}
