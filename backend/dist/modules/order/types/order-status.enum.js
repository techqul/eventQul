"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketStatus = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["CONFIRMED"] = "confirmed";
    OrderStatus["CANCELLED"] = "cancelled";
    OrderStatus["REFUNDED"] = "refunded";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["PENDING"] = "pending";
    TicketStatus["CONFIRMED"] = "confirmed";
    TicketStatus["CANCELLED"] = "cancelled";
    TicketStatus["USED"] = "used";
    TicketStatus["REFUNDED"] = "refunded";
})(TicketStatus || (exports.TicketStatus = TicketStatus = {}));
//# sourceMappingURL=order-status.enum.js.map