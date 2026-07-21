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
exports.BaseEntity = exports.dateTransformer = void 0;
const typeorm_1 = require("typeorm");
exports.dateTransformer = {
    to(value) {
        if (value instanceof Date) {
            return value.toISOString();
        }
        return value ?? null;
    },
    from(value) {
        if (!value)
            return null;
        if (value instanceof Date) {
            return value.toISOString();
        }
        return value;
    },
};
class BaseEntity {
    createdAt;
    updatedAt;
    deletedAt;
    setCreatedAt() {
        if (!this.createdAt) {
            this.createdAt = new Date().toISOString();
        }
        if (!this.updatedAt) {
            this.updatedAt = new Date().toISOString();
        }
    }
    setUpdatedAt() {
        this.updatedAt = new Date().toISOString();
    }
}
exports.BaseEntity = BaseEntity;
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
        transformer: exports.dateTransformer,
    }),
    __metadata("design:type", String)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamp',
        transformer: exports.dateTransformer,
    }),
    __metadata("design:type", String)
], BaseEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        transformer: exports.dateTransformer,
    }),
    __metadata("design:type", String)
], BaseEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseEntity.prototype, "setCreatedAt", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseEntity.prototype, "setUpdatedAt", null);
//# sourceMappingURL=base.entity.js.map