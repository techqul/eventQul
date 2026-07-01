"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var QueryExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const response_interface_1 = require("../interfaces/response.interface");
let QueryExceptionFilter = QueryExceptionFilter_1 = class QueryExceptionFilter {
    logger = new common_1.Logger(QueryExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const query = exception.query;
        const parameters = exception.parameters;
        const driverError = exception.driverError;
        this.logger.error(`Query failed: ${request.method} ${request.url}`, {
            query,
            parameters,
            error: driverError,
        });
        let message = 'Database operation failed';
        let statusCode = 500;
        if (driverError.code === '23505') {
            const constraint = driverError.constraint;
            message = this.parseUniqueViolationError(constraint);
            statusCode = 409;
        }
        if (driverError.code === '23503') {
            const constraint = driverError.constraint;
            message = this.parseForeignKeyViolationError(constraint);
            statusCode = 400;
        }
        if (driverError.code === '23514') {
            message = 'Data constraint violation';
            statusCode = 400;
        }
        if (driverError.code === '23502') {
            message = `Missing required field: ${driverError.column}`;
            statusCode = 400;
        }
        if (driverError.code === '22P02') {
            message = 'Invalid data type provided';
            statusCode = 400;
        }
        const errorResponse = (0, response_interface_1.createErrorResponse)(message, statusCode);
        response.status(statusCode).json(errorResponse);
    }
    parseUniqueViolationError(constraint) {
        const constraintMap = {
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
    parseForeignKeyViolationError(constraint) {
        const constraintMap = {
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
};
exports.QueryExceptionFilter = QueryExceptionFilter;
exports.QueryExceptionFilter = QueryExceptionFilter = QueryExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(typeorm_1.QueryFailedError)
], QueryExceptionFilter);
//# sourceMappingURL=query-exception.filter.js.map