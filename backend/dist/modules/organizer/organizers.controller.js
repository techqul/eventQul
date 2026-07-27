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
exports.OrganizersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const organizers_service_1 = require("./organizers.service");
const create_organizer_dto_1 = require("./dto/create-organizer.dto");
const update_organizer_dto_1 = require("./dto/update-organizer.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const response_message_decorator_1 = require("../../common/decorators/response-message.decorator");
const skip_auth_decorator_1 = require("../../common/decorators/skip-auth.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const types_1 = require("../users/types");
let OrganizersController = class OrganizersController {
    organizersService;
    constructor(organizersService) {
        this.organizersService = organizersService;
    }
    async create(user, createOrganizerDto) {
        return this.organizersService.create(user.id, createOrganizerDto);
    }
    async findAll(page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 20;
        return this.organizersService.findAll(pageNum, limitNum);
    }
    async findOne(slug) {
        return this.organizersService.findBySlug(slug);
    }
    async update(slug, updateOrganizerDto) {
        const organizer = await this.organizersService.findBySlug(slug);
        if (!organizer) {
            throw new Error('Organizer not found');
        }
        return this.organizersService.update(organizer.id, updateOrganizerDto);
    }
    async remove(id) {
        const organizer = await this.organizersService.findOne(id);
        if (!organizer) {
            throw new Error('Organizer not found');
        }
        await this.organizersService.remove(id);
        return { success: true };
    }
    async verifyOrganizer(slug) {
        const organizer = await this.organizersService.findBySlug(slug);
        if (!organizer) {
            throw new Error('Organizer not found');
        }
        return this.organizersService.verifyOrganizer(organizer.id);
    }
};
exports.OrganizersController = OrganizersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.USER, types_1.UserRole.ORGANIZER, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Organizer profile created successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Create organizer profile' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Organizer profile created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User already has an organizer profile' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_organizer_dto_1.CreateOrganizerDto]),
    __metadata("design:returntype", Promise)
], OrganizersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, skip_auth_decorator_1.Public)(),
    (0, response_message_decorator_1.ResponseMessage)('Organizers retrieved successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all organizers (Public)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Organizers retrieved successfully' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrganizersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':slug'),
    (0, skip_auth_decorator_1.Public)(),
    (0, response_message_decorator_1.ResponseMessage)('Organizer retrieved successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Get organizer by slug (Public)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Organizer retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Organizer not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':slug'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ORGANIZER, types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Organizer updated successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Update organizer (Owner/Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Organizer updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Organizer not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_organizer_dto_1.UpdateOrganizerDto]),
    __metadata("design:returntype", Promise)
], OrganizersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Organizer deleted successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete organizer (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Organizer deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Organizer not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':slug/verify'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(types_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, response_message_decorator_1.ResponseMessage)('Organizer verified successfully'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify organizer (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Organizer verified successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Organizer not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizersController.prototype, "verifyOrganizer", null);
exports.OrganizersController = OrganizersController = __decorate([
    (0, swagger_1.ApiTags)('Organizers'),
    (0, common_1.Controller)('organizers'),
    __metadata("design:paramtypes", [organizers_service_1.OrganizersService])
], OrganizersController);
//# sourceMappingURL=organizers.controller.js.map