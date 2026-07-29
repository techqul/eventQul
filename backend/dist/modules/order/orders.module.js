"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const orders_controller_1 = require("./orders.controller");
const orders_service_1 = require("./orders.service");
const order_entity_1 = require("./entities/order.entity");
const ticket_entity_1 = require("./entities/ticket.entity");
const ticket_type_entity_1 = require("../event/entities/ticket-type.entity");
const event_entity_1 = require("../event/entities/event.entity");
const user_entity_1 = require("../users/entities/user.entity");
const auth_module_1 = require("../auth/auth.module");
const otp_module_1 = require("../otp/otp.module");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order, ticket_entity_1.Ticket, ticket_type_entity_1.TicketType, event_entity_1.Event, user_entity_1.User]),
            auth_module_1.AuthModule,
            otp_module_1.OtpModule,
        ],
        controllers: [orders_controller_1.OrdersController, orders_controller_1.TicketsController],
        providers: [orders_service_1.OrdersService],
        exports: [orders_service_1.OrdersService],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map