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
      const exceptionResponse = exception.getResponse();
      if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse
      ) {
        const messages = exceptionResponse.message;
        if (Array.isArray(messages)) {
          errorResponse.errors = messages.map((msg: string) => {
            const [field, ...messageParts] = msg.split(' ');
            return {
              field,
              message: messageParts.join(' '),
            };
          });
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
