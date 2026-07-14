import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

/**
 * Custom validation pipe options
 */
export const validationPipeOptions = {
  whitelist: true, // Strip properties that don't have decorators
  forbidNonWhitelisted: false, // Don't throw error for non-whitelisted properties
  transform: true, // Automatically transform payloads to DTO instances
  transformOptions: {
    enableImplicitConversion: true, // Convert types based on TypeScript types
  },
  exceptionFactory: (errors: ValidationError[]) => {
    const formattedErrors = errors.map((error) => {
      const constraints = error.constraints;
      const children = error.children;

      if (constraints) {
        const messages = Object.values(constraints);
        return {
          field: error.property,
          message: messages.join(', '),
        };
      }

      if (children && children.length > 0) {
        return {
          field: error.property,
          message: 'Nested validation failed',
          children: formatChildrenErrors(children),
        };
      }

      return {
        field: error.property,
        message: 'Validation failed',
      };
    });

    return new BadRequestException({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors,
      statusCode: 400,
    });
  },
};

/**
 * Format nested validation errors
 */
function formatChildrenErrors(errors: ValidationError[]): any[] {
  return errors.map((error) => {
    const constraints = error.constraints;
    const children = error.children;

    if (constraints) {
      const messages = Object.values(constraints);
      return {
        field: error.property,
        message: messages.join(', '),
      };
    }

    if (children && children.length > 0) {
      return {
        field: error.property,
        message: 'Nested validation failed',
        children: formatChildrenErrors(children),
      };
    }

    return {
      field: error.property,
      message: 'Validation failed',
    };
  });
}

/**
 * Create global validation pipe
 */
export const GlobalValidationPipe = new ValidationPipe(validationPipeOptions);
