import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import { createErrorResponse } from '../interfaces/response.interface';

/**
 * Database query exception filter
 * Catches database query errors and converts them to user-friendly messages
 */
@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(QueryExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    // Extract error details
    const query = exception.query;
    const parameters = exception.parameters;
    const driverError = exception.driverError as any;

    this.logger.error(`Query failed: ${request.method} ${request.url}`, {
      query,
      parameters,
      error: driverError,
    });

    // Parse common database errors
    let message = 'Database operation failed';
    let statusCode = 500;

    // Unique violation (duplicate key)
    if (driverError.code === '23505') {
      const constraint = driverError.constraint;
      message = this.parseUniqueViolationError(constraint);
      statusCode = 409;
    }

    // Foreign key violation
    if (driverError.code === '23503') {
      const constraint = driverError.constraint;
      message = this.parseForeignKeyViolationError(constraint);
      statusCode = 400;
    }

    // Check violation
    if (driverError.code === '23514') {
      message = 'Data constraint violation';
      statusCode = 400;
    }

    // Not null violation
    if (driverError.code === '23502') {
      message = `Missing required field: ${driverError.column}`;
      statusCode = 400;
    }

    // Data type violation
    if (driverError.code === '22P02') {
      message = 'Invalid data type provided';
      statusCode = 400;
    }

    const errorResponse = createErrorResponse(message, statusCode);

    response.status(statusCode).json(errorResponse);
  }

  /**
   * Parse unique violation errors and return user-friendly messages
   */
  private parseUniqueViolationError(constraint: string): string {
    const constraintMap: Record<string, string> = {
      users_email_unique: 'Email already exists',
      users_phone_unique: 'Phone number already exists',
      organizers_slug_unique: 'Organizer with this slug already exists',
      events_slug_unique: 'Event with this slug already exists',
      venues_slug_unique: 'Venue with this slug already exists',
      categories_slug_unique: 'Category with this slug already exists',
      tickets_qr_code_unique: 'QR code already exists',
      orders_order_number_unique: 'Order number already exists',
      coupons_code_unique: 'Coupon code already exists',
      roles_name_unique: 'Role name already exists',
      permissions_name_unique: 'Permission name already exists',
      role_permissions_unique: 'Role permission already exists',
    };

    return constraintMap[constraint] || 'Duplicate entry detected';
  }

  /**
   * Parse foreign key violation errors
   */
  private parseForeignKeyViolationError(constraint: string): string {
    const constraintMap: Record<string, string> = {
      fk_users_role: 'Invalid role specified',
      fk_organizers_user_id: 'User not found',
      fk_events_organizer_id: 'Organizer not found',
      fk_events_venue_id: 'Venue not found',
      fk_events_category_id: 'Category not found',
      fk_events_created_by: 'User not found',
      fk_ticket_types_event_id: 'Event not found',
      fk_orders_user_id: 'User not found',
      fk_orders_coupon_id: 'Coupon not found',
      fk_tickets_order_id: 'Order not found',
      fk_tickets_event_id: 'Event not found',
      fk_tickets_ticket_type_id: 'Ticket type not found',
      fk_notifications_user_id: 'User not found',
    };

    return constraintMap[constraint] || 'Related record not found';
  }
}
