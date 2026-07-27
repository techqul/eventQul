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
exports.Ticket = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const event_entity_1 = require("../../event/entities/event.entity");
const ticket_type_entity_1 = require("../../event/entities/ticket-type.entity");
const order_status_enum_1 = require("../types/order-status.enum");
let Ticket = class Ticket {
    id;
    order;
    orderId;
    event;
    eventId;
    ticketType;
    ticketTypeId;
    qrCode;
    attendeeName;
    attendeeEmail;
    attendeePhone;
    status;
    checkedInAt;
};
exports.Ticket = Ticket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Ticket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", order_entity_1.Order)
], Ticket.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_id' }),
    __metadata("design:type", String)
], Ticket.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event),
    (0, typeorm_1.JoinColumn)({ name: 'event_id' }),
    __metadata("design:type", event_entity_1.Event)
], Ticket.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'event_id' }),
    __metadata("design:type", String)
], Ticket.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ticket_type_entity_1.TicketType),
    (0, typeorm_1.JoinColumn)({ name: 'ticket_type_id' }),
    __metadata("design:type", ticket_type_entity_1.TicketType)
], Ticket.prototype, "ticketType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ticket_type_id' }),
    __metadata("design:type", String)
], Ticket.prototype, "ticketTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Ticket.prototype, "qrCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'attendee_name' }),
    __metadata("design:type", String)
], Ticket.prototype, "attendeeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'attendee_email' }),
    __metadata("design:type", String)
], Ticket.prototype, "attendeeEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'attendee_phone' }),
    __metadata("design:type", String)
], Ticket.prototype, "attendeePhone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: order_status_enum_1.TicketStatus,
        default: order_status_enum_1.TicketStatus.CONFIRMED,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'checked_in_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "checkedInAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
    }),
    __metadata("design:type", String)
], Ticket.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamp',
    }),
    __metadata("design:type", String)
], Ticket.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "deletedAt", void 0);
exports.Ticket = Ticket = __decorate([
    (0, typeorm_1.Entity)('tickets')
], Ticket);
//# sourceMappingURL=ticket.entity.js.map