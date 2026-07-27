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
exports.Event = void 0;
const typeorm_1 = require("typeorm");
const organizer_entity_1 = require("../../organizer/entities/organizer.entity");
const venue_entity_1 = require("../../venue/entities/venue.entity");
const category_entity_1 = require("../../category/entities/category.entity");
const ticket_type_entity_1 = require("./ticket-type.entity");
const event_status_enum_1 = require("../types/event-status.enum");
let Event = class Event {
    id;
    organizer;
    organizerId;
    venue;
    venueId;
    category;
    categoryId;
    ticketTypes;
    slug;
    title;
    description;
    longDescription;
    coverImage;
    gallery;
    startDate;
    endDate;
    timezone;
    capacity;
    soldTickets;
    status;
    featured;
    trending;
    tags;
};
exports.Event = Event;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organizer_entity_1.Organizer, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'organizer_id' }),
    __metadata("design:type", organizer_entity_1.Organizer)
], Event.prototype, "organizer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organizer_id' }),
    __metadata("design:type", String)
], Event.prototype, "organizerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => venue_entity_1.Venue),
    (0, typeorm_1.JoinColumn)({ name: 'venue_id' }),
    __metadata("design:type", venue_entity_1.Venue)
], Event.prototype, "venue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'venue_id' }),
    __metadata("design:type", String)
], Event.prototype, "venueId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", category_entity_1.Category)
], Event.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id' }),
    __metadata("design:type", String)
], Event.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_type_entity_1.TicketType, (ticketType) => ticketType.event, { cascade: true }),
    __metadata("design:type", Array)
], Event.prototype, "ticketTypes", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Event.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'long_description', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "longDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cover_image', nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "coverImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], Event.prototype, "gallery", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'timestamp' }),
    __metadata("design:type", Date)
], Event.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'timestamp' }),
    __metadata("design:type", Date)
], Event.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "timezone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Event.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sold_tickets', default: 0 }),
    __metadata("design:type", Number)
], Event.prototype, "soldTickets", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: event_status_enum_1.EventStatus,
        default: event_status_enum_1.EventStatus.UPCOMING,
    }),
    __metadata("design:type", String)
], Event.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Event.prototype, "featured", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Event.prototype, "trending", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: '[]' }),
    __metadata("design:type", Array)
], Event.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
    }),
    __metadata("design:type", String)
], Event.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamp',
    }),
    __metadata("design:type", String)
], Event.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
    }),
    __metadata("design:type", String)
], Event.prototype, "deletedAt", void 0);
exports.Event = Event = __decorate([
    (0, typeorm_1.Entity)('events')
], Event);
//# sourceMappingURL=event.entity.js.map