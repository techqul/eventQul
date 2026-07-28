"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketTypesController = exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const events_service_1 = require("./events.service");
const create_event_dto_1 = require("./dto/create-event.dto");
const update_event_dto_1 = require("./dto/update-event.dto");
const create_event_dto_2 = require("./dto/create-event.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const response_message_decorator_1 = require("../../common/decorators/response-message.decorator");
const skip_auth_decorator_1 = require("../../common/decorators/skip-auth.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const types_1 = require("../users/types");
let EventsController = class EventsController {
    eventsService;
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    async create(user, createEventDto) {
        return this.eventsService.create(createEventDto, user.id);
    }
    async findAll(page, limit, search, category, status, featured, trending) {
        const filters = { search, category, status, featured, trending };
        return this.eventsService.findAll(page, limit, filters);
    }
    async findById(id) {
        return this.eventsService.findById(id);
    }
    async findOne(slug) {
        return this.eventsService.findBySlug(slug);
    }
    async update(slug, updateEventDto) {
        const event = await this.eventsService.findBySlug(slug);
        if (!event) {
            throw new Error('Event not found');
        }
        return this.eventsService.update(event.id, updateEventDto);
    }
    async remove(slug) {
        const event = await this.eventsService.findBySlug(slug);
        if (!event) {
            throw new Error('Event not found');
        }
        await this.eventsService.remove(event.id);
        return { success: true };
    }
    async addTicketType(slug, createTicketTypeDto) {
        const event = await this.eventsService.findBySlug(slug);
        if (!event) {
            throw new Error('Event not found');
        }
        return this.eventsService.addTicketType(event.id, createTicketTypeDto);
    }
    async getTicketTypes(slug) {
        const event = await this.eventsService.findBySlug(slug);
        if (!event) {
            throw new Error('Event not found');
        }
        return event.ticketTypes;
    }
};
exports.EventsController = EventsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ORGANIZER, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Event created successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new event (Organizer/Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Event created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Event with this slug already exists' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_event_dto_1.CreateEventDto]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, skip_auth_decorator_1.Public)(),
    (0, response_message_decorator_1.ResponseMessage)('Events retrieved successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all events (Public with filters)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Events retrieved successfully' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'featured', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'trending', required: false, type: Boolean }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('category')),
    __param(4, (0, common_1.Query)('status')),
    __param(5, (0, common_1.Query)('featured')),
    __param(6, (0, common_1.Query)('trending')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, skip_auth_decorator_1.Public)(),
    (0, response_message_decorator_1.ResponseMessage)('Event retrieved successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Get event by slug (Public)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':slug'),
    (0, skip_auth_decorator_1.Public)(),
    (0, response_message_decorator_1.ResponseMessage)('Event retrieved successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Get event by slug (Public)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':slug'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ORGANIZER, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Event updated successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Update event (Owner/Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_event_dto_1.UpdateEventDto]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':slug'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ORGANIZER, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Event deleted successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete event (Owner/Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':slug/ticket-types'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ORGANIZER, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Ticket type added successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Add ticket type to event (Owner/Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Ticket type added successfully' }),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_event_dto_2.CreateTicketTypeDto]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "addTicketType", null);
__decorate([
    (0, common_1.Get)(':slug/ticket-types'),
    (0, skip_auth_decorator_1.Public)(),
    (0, response_message_decorator_1.ResponseMessage)('Ticket types retrieved successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Get ticket types for event (Public)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket types retrieved successfully' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getTicketTypes", null);
exports.EventsController = EventsController = __decorate([
    (0, swagger_1.ApiTags)('Events'),
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
let TicketTypesController = class TicketTypesController {
    eventsService;
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    async update(id, updateTicketTypeDto) {
        return this.eventsService.updateTicketType(id, updateTicketTypeDto);
    }
    async remove(id) {
        await this.eventsService.removeTicketType(id);
        return { success: true };
    }
};
exports.TicketTypesController = TicketTypesController;
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ORGANIZER, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Ticket type updated successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Update ticket type (Owner/Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket type updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ORGANIZER, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Ticket type deleted successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete ticket type (Owner/Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket type deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketTypesController.prototype, "remove", null);
exports.TicketTypesController = TicketTypesController = __decorate([
    (0, swagger_1.ApiTags)('Ticket Types'),
    (0, common_1.Controller)('ticket-types'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], TicketTypesController);
//# sourceMappingURL=events.controller.js.map