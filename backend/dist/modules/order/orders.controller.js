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
exports.TicketsController = exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_status_dto_1 = require("./dto/update-order-status.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const response_message_decorator_1 = require("../../common/decorators/response-message.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const types_1 = require("../users/types");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async create(user, createOrderDto) {
        return this.ordersService.create(user.id, createOrderDto);
    }
    async findAll(user, page, limit) {
        return this.ordersService.findByUser(user.id, page, limit);
    }
    async getMyTickets(user) {
        return this.ordersService.getUserTickets(user.id);
    }
    async findOne(orderNumber, user) {
        const order = await this.ordersService.findByOrderNumber(orderNumber);
        if (!order) {
            throw new Error('Order not found');
        }
        if (order.userId !== user.id && user.role !== types_1.UserRole.ADMIN) {
            throw new Error('Access denied');
        }
        return order;
    }
    async updateStatus(orderNumber, updateOrderStatusDto) {
        const order = await this.ordersService.findByOrderNumber(orderNumber);
        if (!order) {
            throw new Error('Order not found');
        }
        return this.ordersService.updateStatus(order.id, updateOrderStatusDto.status);
    }
    async cancelOrder(orderNumber, user) {
        const order = await this.ordersService.findByOrderNumber(orderNumber);
        if (!order) {
            throw new Error('Order not found');
        }
        if (order.userId !== user.id && user.role !== types_1.UserRole.ADMIN) {
            throw new Error('Access denied');
        }
        return this.ordersService.cancelOrder(order.id);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Order created successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new order' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Order created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - invalid input or not enough tickets' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Orders retrieved successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user orders' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Orders retrieved successfully' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-tickets'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Tickets retrieved successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user tickets' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tickets retrieved successfully' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getMyTickets", null);
__decorate([
    (0, common_1.Get)(':orderNumber'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Order retrieved successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Get order by order number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    __param(0, (0, common_1.Param)('orderNumber')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':orderNumber/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Order status updated successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Update order status (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order status updated successfully' }),
    __param(0, (0, common_1.Param)('orderNumber')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_status_dto_1.UpdateOrderStatusDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)(':orderNumber/cancel'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Order cancelled successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel order' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order cancelled successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Order cannot be cancelled' }),
    __param(0, (0, common_1.Param)('orderNumber')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "cancelOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
let TicketsController = class TicketsController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async verifyTicket(qrCode) {
        return this.ordersService.verifyTicket(qrCode);
    }
    async checkInTicket(qrCode) {
        return this.ordersService.checkInTicket(qrCode);
    }
};
exports.TicketsController = TicketsController;
__decorate([
    (0, common_1.Post)(':qrCode/verify'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ORGANIZER, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Ticket verified successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify ticket by QR code (Organizer/Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket verified successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Ticket already used' }),
    __param(0, (0, common_1.Param)('qrCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "verifyTicket", null);
__decorate([
    (0, common_1.Post)(':qrCode/check-in'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ORGANIZER, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Ticket checked in successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Check in ticket by QR code (Organizer/Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket checked in successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Ticket already used or invalid status' }),
    __param(0, (0, common_1.Param)('qrCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "checkInTicket", null);
exports.TicketsController = TicketsController = __decorate([
    (0, swagger_1.ApiTags)('Tickets'),
    (0, common_1.Controller)('tickets'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], TicketsController);
//# sourceMappingURL=orders.controller.js.map