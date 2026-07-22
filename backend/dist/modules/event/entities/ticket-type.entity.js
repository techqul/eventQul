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
exports.TicketType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const event_entity_1 = require("./event.entity");
const base_entity_2 = require("../../../common/entities/base.entity");
let TicketType = class TicketType extends base_entity_1.BaseEntity {
    id;
    event;
    eventId;
    name;
    description;
    price;
    currency;
    available;
    maxPerPurchase;
    benefits;
};
exports.TicketType = TicketType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TicketType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'event_id' }),
    __metadata("design:type", event_entity_1.Event)
], TicketType.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'event_id' }),
    __metadata("design:type", String)
], TicketType.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TicketType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TicketType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], TicketType.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'BDT' }),
    __metadata("design:type", String)
], TicketType.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TicketType.prototype, "available", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_per_purchase', default: 10 }),
    __metadata("design:type", Number)
], TicketType.prototype, "maxPerPurchase", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], TicketType.prototype, "benefits", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
        transformer: base_entity_2.dateTransformer,
    }),
    __metadata("design:type", String)
], TicketType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamp',
        transformer: base_entity_2.dateTransformer,
    }),
    __metadata("design:type", String)
], TicketType.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        transformer: base_entity_2.dateTransformer,
    }),
    __metadata("design:type", String)
], TicketType.prototype, "deletedAt", void 0);
exports.TicketType = TicketType = __decorate([
    (0, typeorm_1.Entity)('ticket_types')
], TicketType);
//# sourceMappingURL=ticket-type.entity.js.map