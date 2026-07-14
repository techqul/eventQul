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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const swagger_1 = require("@nestjs/swagger");
let HealthController = class HealthController {
    health;
    db;
    memory;
    disk;
    constructor(health, db, memory, disk) {
        this.health = health;
        this.db = db;
        this.memory = memory;
        this.disk = disk;
    }
    basicHealth() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            service: 'eventqul-api',
            version: '1.0.0',
        };
    }
    detailedHealth() {
        return this.health.check([
            () => this.db.pingCheck('database', {
                timeout: 5000,
            }),
            () => this.memory.checkHeap('memory_heap', 500 * 1024 * 1024),
            () => this.memory.checkRSS('memory_rss', 1024 * 1024 * 1024),
            () => this.disk.checkStorage('disk', {
                path: '/',
                thresholdPercent: 0.9,
            }),
        ]);
    }
    readiness() {
        return {
            status: 'ready',
            timestamp: new Date().toISOString(),
        };
    }
    liveness() {
        return {
            status: 'alive',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Basic health check' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Service is healthy' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "basicHealth", null);
__decorate([
    (0, common_1.Get)('detailed'),
    (0, terminus_1.HealthCheck)(),
    (0, swagger_1.ApiOperation)({ summary: 'Detailed health check with component status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All components are healthy' }),
    (0, swagger_1.ApiResponse)({
        status: 503,
        description: 'One or more components are unhealthy',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "detailedHealth", null);
__decorate([
    (0, common_1.Get)('ready'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Readiness probe' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Service is ready' }),
    (0, swagger_1.ApiResponse)({ status: 503, description: 'Service is not ready' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "readiness", null);
__decorate([
    (0, common_1.Get)('live'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Liveness probe' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Service is alive' }),
    (0, swagger_1.ApiResponse)({ status: 503, description: 'Service is not alive' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "liveness", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('Health'),
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.TypeOrmHealthIndicator,
        terminus_1.MemoryHealthIndicator,
        terminus_1.DiskHealthIndicator])
], HealthController);
//# sourceMappingURL=health.controller.js.map