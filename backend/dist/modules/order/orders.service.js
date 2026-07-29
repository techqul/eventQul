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
var OrdersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const ticket_entity_1 = require("./entities/ticket.entity");
const ticket_type_entity_1 = require("../event/entities/ticket-type.entity");
const event_entity_1 = require("../event/entities/event.entity");
const order_status_enum_1 = require("./types/order-status.enum");
const otp_service_1 = require("../otp/otp.service");
let OrdersService = OrdersService_1 = class OrdersService {
    orderRepository;
    ticketRepository;
    ticketTypeRepository;
    eventRepository;
    dataSource;
    otpService;
    logger = new common_1.Logger(OrdersService_1.name);
    constructor(orderRepository, ticketRepository, ticketTypeRepository, eventRepository, dataSource, otpService) {
        this.orderRepository = orderRepository;
        this.ticketRepository = ticketRepository;
        this.ticketTypeRepository = ticketTypeRepository;
        this.eventRepository = eventRepository;
        this.dataSource = dataSource;
        this.otpService = otpService;
    }
    async create(userId, createOrderDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let subtotal = 0;
            const ticketItems = [];
            for (const item of createOrderDto.tickets) {
                const ticketType = await queryRunner.manager.findOne(ticket_type_entity_1.TicketType, {
                    where: { id: item.ticketTypeId },
                    relations: { event: true },
                });
                if (!ticketType) {
                    throw new common_1.NotFoundException(`Ticket type ${item.ticketTypeId} not found`);
                }
                if (ticketType.available < item.quantity) {
                    throw new common_1.ConflictException(`Not enough tickets available. Only ${ticketType.available} left.`);
                }
                if (item.quantity > ticketType.maxPerPurchase) {
                    throw new common_1.BadRequestException(`Maximum ${ticketType.maxPerPurchase} tickets allowed per purchase for this ticket type.`);
                }
                const itemTotal = Number(ticketType.price) * item.quantity;
                subtotal += itemTotal;
                ticketItems.push({
                    ticketType,
                    quantity: item.quantity,
                    itemTotal,
                });
            }
            const discount = 0;
            const total = subtotal - discount;
            const orderNumber = this.generateOrderNumber();
            const orderCreate = queryRunner.manager.create(order_entity_1.Order, {
                userId,
                orderNumber,
                subtotal,
                discount,
                total,
                status: order_status_enum_1.OrderStatus.PENDING,
                couponCode: createOrderDto.couponCode,
                paymentMethod: createOrderDto.paymentMethod,
                paymentStatus: 'pending',
            });
            const savedOrder = await queryRunner.manager.save(orderCreate);
            const tickets = [];
            for (const item of ticketItems) {
                for (let i = 0; i < item.quantity; i++) {
                    const qrCode = this.generateQRCode();
                    const ticket = queryRunner.manager.create(ticket_entity_1.Ticket, {
                        orderId: savedOrder.id,
                        eventId: item.ticketType.eventId,
                        ticketTypeId: item.ticketType.id,
                        qrCode,
                        attendeeName: createOrderDto.attendeeName,
                        attendeeEmail: createOrderDto.attendeeEmail,
                        attendeePhone: createOrderDto.attendeePhone,
                        status: order_status_enum_1.TicketStatus.CONFIRMED,
                    });
                    tickets.push(ticket);
                }
                await queryRunner.manager.decrement(ticket_type_entity_1.TicketType, { id: item.ticketType.id }, 'available', item.quantity);
            }
            await queryRunner.manager.save(tickets);
            for (const item of ticketItems) {
                await queryRunner.manager.increment(event_entity_1.Event, { id: item.ticketType.eventId }, 'soldTickets', item.quantity);
            }
            await queryRunner.commitTransaction();
            this.logger.log(`Order created successfully: ${orderNumber}`);
            try {
                const eventName = ticketItems[0]?.ticketType?.event?.title || 'Event';
                const totalTickets = createOrderDto.tickets.reduce((sum, t) => sum + t.quantity, 0);
                const confirmationMessage = `EventQul: Your order ${orderNumber} for ${eventName} has been confirmed! Total tickets: ${totalTickets}. Amount: ৳${total}. Thank you for your purchase.`;
                await this.otpService.sendOtp({ mobileNo: createOrderDto.attendeePhone }, confirmationMessage);
                this.logger.log(`Order confirmation SMS sent to ${createOrderDto.attendeePhone}`);
            }
            catch (smsError) {
                console.log("error", smsError);
            }
            const order = await this.findOne(savedOrder.id);
            return this.toOrderResponse(order);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAll(page = 1, limit = 20) {
        const [orders, total] = await this.orderRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
            relations: { user: true, tickets: true },
        });
        return {
            data: orders,
            page,
            size: limit,
            total,
        };
    }
    async findByUser(userId, page = 1, limit = 20) {
        const [orders, total] = await this.orderRepository.findAndCount({
            where: { userId },
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
            relations: { tickets: { event: true, ticketType: true } },
        });
        return {
            data: orders,
            page,
            size: limit,
            total,
        };
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: { user: true, tickets: { event: true, ticketType: true } },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return order;
    }
    async findByOrderNumber(orderNumber) {
        return this.orderRepository.findOne({
            where: { orderNumber },
            relations: { user: true, tickets: { event: true, ticketType: true } },
        });
    }
    async updateStatus(id, status) {
        const order = await this.findOne(id);
        order.status = status;
        if (status === order_status_enum_1.OrderStatus.CONFIRMED) {
            order.paymentStatus = 'completed';
            order.paidAt = new Date();
        }
        const updatedOrder = await this.orderRepository.save(order);
        this.logger.log(`Order status updated: ${id} -> ${status}`);
        return updatedOrder;
    }
    async verifyTicket(qrCode) {
        const ticket = await this.ticketRepository.findOne({
            where: { qrCode },
            relations: { event: true, order: true, ticketType: true },
        });
        if (!ticket) {
            throw new common_1.NotFoundException('Ticket not found');
        }
        if (ticket.status === order_status_enum_1.TicketStatus.USED) {
            throw new common_1.ConflictException('Ticket has already been used');
        }
        if (ticket.status !== order_status_enum_1.TicketStatus.CONFIRMED) {
            throw new common_1.BadRequestException(`Ticket is ${ticket.status.toLowerCase()}. Cannot verify.`);
        }
        return ticket;
    }
    async checkInTicket(qrCode) {
        const ticket = await this.verifyTicket(qrCode);
        ticket.status = order_status_enum_1.TicketStatus.USED;
        ticket.checkedInAt = new Date();
        const checkedInTicket = await this.ticketRepository.save(ticket);
        this.logger.log(`Ticket checked in: ${qrCode}`);
        return checkedInTicket;
    }
    async getUserTickets(userId) {
        const orders = await this.orderRepository.find({
            where: { userId },
            relations: { tickets: { event: true, ticketType: true } },
        });
        const tickets = [];
        for (const order of orders) {
            tickets.push(...order.tickets);
        }
        return tickets;
    }
    generateOrderNumber() {
        const prefix = 'EQ';
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 8);
        return `${prefix}-${timestamp}-${random}`.toUpperCase();
    }
    generateQRCode() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 15);
        const random2 = Math.random().toString(36).substring(2, 15);
        return `TICKET-${timestamp}-${random}-${random2}`.toUpperCase();
    }
    async cancelOrder(id) {
        const order = await this.findOne(id);
        if (order.status === order_status_enum_1.OrderStatus.CANCELLED) {
            throw new common_1.ConflictException('Order is already cancelled');
        }
        if (order.status === order_status_enum_1.OrderStatus.REFUNDED) {
            throw new common_1.ConflictException('Order is already refunded');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            order.status = order_status_enum_1.OrderStatus.CANCELLED;
            await queryRunner.manager.save(order);
            await queryRunner.manager.update(ticket_entity_1.Ticket, { orderId: order.id }, { status: order_status_enum_1.TicketStatus.CANCELLED });
            for (const ticket of order.tickets) {
                await queryRunner.manager.increment(ticket_type_entity_1.TicketType, { id: ticket.ticketTypeId }, 'available', 1);
            }
            for (const ticket of order.tickets) {
                await queryRunner.manager.decrement(event_entity_1.Event, { id: ticket.eventId }, 'soldTickets', 1);
            }
            await queryRunner.commitTransaction();
            this.logger.log(`Order cancelled: ${id}`);
            return this.findOne(id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    toOrderResponse(order) {
        return {
            id: order.id,
            userId: order.userId,
            orderNumber: order.orderNumber,
            subtotal: Number(order.subtotal),
            discount: Number(order.discount),
            total: Number(order.total),
            status: order.status,
            couponCode: order.couponCode || null,
            paymentMethod: order.paymentMethod || null,
            paymentStatus: order.paymentStatus,
            paidAt: order.paidAt ? order.paidAt.toISOString() : null,
            tickets: order.tickets?.map((ticket) => this.toTicketResponse(ticket)) || [],
            createdAt: order.createdAt || '',
            updatedAt: order.updatedAt || '',
        };
    }
    toTicketResponse(ticket) {
        return {
            id: ticket.id,
            orderId: ticket.orderId,
            eventId: ticket.eventId,
            eventTitle: ticket.event?.title || null,
            eventDate: ticket.event?.startDate ? ticket.event.startDate.toISOString() : null,
            eventCoverImage: ticket.event?.coverImage || null,
            ticketTypeId: ticket.ticketTypeId,
            ticketTypeName: ticket.ticketType?.name || null,
            ticketPrice: String(ticket.ticketType?.price || '0'),
            qrCode: ticket.qrCode,
            attendeeName: ticket.attendeeName,
            attendeeEmail: ticket.attendeeEmail,
            attendeePhone: ticket.attendeePhone,
            status: ticket.status,
            checkedInAt: ticket.checkedInAt ? ticket.checkedInAt.toISOString() : null,
            createdAt: ticket.createdAt || '',
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = OrdersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __param(2, (0, typeorm_1.InjectRepository)(ticket_type_entity_1.TicketType)),
    __param(3, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        otp_service_1.OtpService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map