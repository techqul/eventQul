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
exports.VenuesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const venues_service_1 = require("./venues.service");
const create_venue_dto_1 = require("./dto/create-venue.dto");
const update_venue_dto_1 = require("./dto/update-venue.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const response_message_decorator_1 = require("../../common/decorators/response-message.decorator");
const skip_auth_decorator_1 = require("../../common/decorators/skip-auth.decorator");
const types_1 = require("../users/types");
let VenuesController = class VenuesController {
    venuesService;
    constructor(venuesService) {
        this.venuesService = venuesService;
    }
    async create(createVenueDto) {
        return this.venuesService.create(createVenueDto);
    }
    async findAll(page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 20;
        return this.venuesService.findAll(pageNum, limitNum);
    }
    async findOne(id) {
        return this.venuesService.findOne(id);
    }
    async update(id, updateVenueDto) {
        return this.venuesService.update(id, updateVenueDto);
    }
    async remove(id) {
        await this.venuesService.remove(id);
        return { success: true };
    }
};
exports.VenuesController = VenuesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ORGANIZER, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Venue created successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new venue (Organizer/Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Venue created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Venue with this slug already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_venue_dto_1.CreateVenueDto]),
    __metadata("design:returntype", Promise)
], VenuesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, skip_auth_decorator_1.Public)(),
    (0, response_message_decorator_1.ResponseMessage)('Venues retrieved successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all venues (Public)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Venues retrieved successfully' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], VenuesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, skip_auth_decorator_1.Public)(),
    (0, response_message_decorator_1.ResponseMessage)('Venue retrieved successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Get venue by ID (Public)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Venue retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Venue not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VenuesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ORGANIZER, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Venue updated successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Update venue (Organizer/Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Venue updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Venue not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Venue with this slug already exists' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_venue_dto_1.UpdateVenueDto]),
    __metadata("design:returntype", Promise)
], VenuesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Venue deleted successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete venue (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Venue deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Venue not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VenuesController.prototype, "remove", null);
exports.VenuesController = VenuesController = __decorate([
    (0, swagger_1.ApiTags)('Venues'),
    (0, common_1.Controller)('venues'),
    __metadata("design:paramtypes", [venues_service_1.VenuesService])
], VenuesController);
//# sourceMappingURL=venues.controller.js.map