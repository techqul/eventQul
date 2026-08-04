import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { Ticket } from './entities/ticket.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { TicketType } from '../event/entities/ticket-type.entity';
import { Event } from '../event/entities/event.entity';
import { OrderStatus, TicketStatus } from './types/order-status.enum';
import { OtpService } from '../otp/otp.service';

export interface PaginatedResult<T> {
  data: T[];
  page: number;
  size: number;
  total: number;
}

// Clean response interfaces
export interface SerializedTicket {
  id: string;
  orderId: string;
  eventId: string;
  eventTitle: string | null;
  eventDate: string | null;
  eventCoverImage: string | null;
  ticketTypeId: string;
  ticketTypeName: string | null;
  ticketPrice: string;
  qrCode: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  status: string;
  checkedInAt: string | null;
  createdAt: string;
}

export interface SerializedOrder {
  id: string;
  userId: string;
  orderNumber: string;
  subtotal: number;
  discount: number;
  total: number;
  status: string;
  couponCode: string | null;
  paymentMethod: string | null;
  paymentStatus: string;
  paidAt: string | null;
  tickets: SerializedTicket[];
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(TicketType)
    private readonly ticketTypeRepository: Repository<TicketType>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private dataSource: DataSource,
    private readonly otpService: OtpService,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<SerializedOrder> {
    // Start a transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validate ticket types and calculate total
      let subtotal = 0;
      const ticketItems: any[] = [];

      for (const item of createOrderDto.tickets) {
        const ticketType = await queryRunner.manager.findOne(TicketType, {
          where: { id: item.ticketTypeId },
          relations: { event: true },
        });

        if (!ticketType) {
          throw new NotFoundException(`Ticket type ${item.ticketTypeId} not found`);
        }

        // Check availability
        if (ticketType.available < item.quantity) {
          throw new ConflictException(
            `Not enough tickets available. Only ${ticketType.available} left.`,
          );
        }

        // Check max per purchase
        if (item.quantity > ticketType.maxPerPurchase) {
          throw new BadRequestException(
            `Maximum ${ticketType.maxPerPurchase} tickets allowed per purchase for this ticket type.`,
          );
        }

        const itemTotal = Number(ticketType.price) * item.quantity;
        subtotal += itemTotal;

        ticketItems.push({
          ticketType,
          quantity: item.quantity,
          itemTotal,
        });
      }

      // Apply coupon discount (placeholder - can be implemented later)
      const discount = 0;
      const total = subtotal - discount;

      // Generate unique order number
      const orderNumber = this.generateOrderNumber();

      // Create order
      const orderCreate = queryRunner.manager.create(Order, {
        userId,
        orderNumber,
        subtotal,
        discount,
        total,
        status: OrderStatus.PENDING,
        couponCode: createOrderDto.couponCode,
        paymentMethod: createOrderDto.paymentMethod,
        paymentStatus: 'pending',
      });

      const savedOrder = await queryRunner.manager.save(orderCreate);

      // Create tickets
      const tickets: Ticket[] = [];
      for (const item of ticketItems) {
        for (let i = 0; i < item.quantity; i++) {
          const qrCode = this.generateQRCode();
          const ticket = queryRunner.manager.create(Ticket, {
            orderId: savedOrder.id,
            eventId: item.ticketType.eventId,
            ticketTypeId: item.ticketType.id,
            qrCode,
            attendeeName: createOrderDto.attendeeName,
            attendeeEmail: createOrderDto.attendeeEmail,
            attendeePhone: createOrderDto.attendeePhone,
            status: TicketStatus.CONFIRMED,
          });
          tickets.push(ticket);
        }

        // Update ticket type availability
        await queryRunner.manager.decrement(
          TicketType,
          { id: item.ticketType.id },
          'available',
          item.quantity,
        );
      }

      await queryRunner.manager.save(tickets);

      // Update event sold tickets count
      for (const item of ticketItems) {
        await queryRunner.manager.increment(
          Event,
          { id: item.ticketType.eventId },
          'soldTickets',
          item.quantity,
        );
      }

      // Commit transaction
      await queryRunner.commitTransaction();

      // Send order confirmation SMS
      try {
        const eventName = ticketItems[0]?.ticketType?.event?.title || 'Event';
        const totalTickets = createOrderDto.tickets.reduce((sum, t) => sum + t.quantity, 0);
        const confirmationMessage = `Your ticket ${orderNumber} for ${eventName} has been confirmed! Total tickets: ${totalTickets}. Amount: ৳${total}. Thank you for your purchase.`;
        const message = `এইচএসসি '৯৫ ব্যাচের ৩০ বছর পূর্তি অনুষ্ঠানে সফলভাবে রেজিষ্ট্রেশন করার জন্য তোমাকে ধন্যবাদ।`;
        await this.otpService.sendOtp({ mobileNo: createOrderDto.attendeePhone }, message);
      } catch (smsError) {
        console.log('error', smsError);
      }

      // Return clean response
      const order = await this.findOne(savedOrder.id);
      return this.toOrderResponse(order);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(page = 1, limit = 20): Promise<PaginatedResult<Order>> {
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

  async findByUser(userId: string, page = 1, limit = 20): Promise<PaginatedResult<Order>> {
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

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { user: true, tickets: { event: true, ticketType: true } },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async findByOrderNumber(orderNumber: string): Promise<Order | null> {
    const query = `
      SELECT *
      FROM get_order_details($1) AS data;
    `;

    const result = await this.dataSource.query(query, [orderNumber]);

    return result[0].data;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.findOne(id);

    order.status = status;

    // If confirmed, update payment status and timestamps
    if (status === OrderStatus.CONFIRMED) {
      order.paymentStatus = 'completed';
      order.paidAt = new Date();
    }

    const updatedOrder = await this.orderRepository.save(order);

    this.logger.log(`Order status updated: ${id} -> ${status}`);

    return updatedOrder;
  }

  async verifyTicket(qrCode: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { qrCode },
      relations: { event: true, order: true, ticketType: true },
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    if (ticket.status === TicketStatus.USED) {
      throw new ConflictException('Ticket has already been used');
    }

    if (ticket.status !== TicketStatus.CONFIRMED) {
      throw new BadRequestException(`Ticket is ${ticket.status.toLowerCase()}. Cannot verify.`);
    }

    return ticket;
  }

  async checkInTicket(qrCode: string): Promise<Ticket> {
    const ticket = await this.verifyTicket(qrCode);

    ticket.status = TicketStatus.USED;
    ticket.checkedInAt = new Date();

    const checkedInTicket = await this.ticketRepository.save(ticket);

    this.logger.log(`Ticket checked in: ${qrCode}`);

    return checkedInTicket;
  }

  async getUserTickets(userId: string): Promise<Ticket[]> {
    const orders = await this.orderRepository.find({
      where: { userId },
      relations: { tickets: { event: true, ticketType: true } },
    });

    const tickets: Ticket[] = [];
    for (const order of orders) {
      tickets.push(...order.tickets);
    }

    return tickets;
  }

  private generateOrderNumber(): string {
    const prefix = 'EQ';
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}-${timestamp}-${random}`.toUpperCase();
  }

  private generateQRCode(): string {
    // Generate a unique QR code
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 15);
    const random2 = Math.random().toString(36).substring(2, 15);
    return `TICKET-${timestamp}-${random}-${random2}`.toUpperCase();
  }

  async cancelOrder(id: string): Promise<Order> {
    const order = await this.findOne(id);

    if (order.status === OrderStatus.CANCELLED) {
      throw new ConflictException('Order is already cancelled');
    }

    if (order.status === OrderStatus.REFUNDED) {
      throw new ConflictException('Order is already refunded');
    }

    // Start a transaction to revert ticket counts
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Update order status
      order.status = OrderStatus.CANCELLED;
      await queryRunner.manager.save(order);

      // Update tickets status
      await queryRunner.manager.update(
        Ticket,
        { orderId: order.id },
        { status: TicketStatus.CANCELLED },
      );

      // Restore ticket type availability
      for (const ticket of order.tickets) {
        await queryRunner.manager.increment(
          TicketType,
          { id: ticket.ticketTypeId },
          'available',
          1,
        );
      }

      // Decrement event sold tickets count
      for (const ticket of order.tickets) {
        await queryRunner.manager.decrement(Event, { id: ticket.eventId }, 'soldTickets', 1);
      }

      await queryRunner.commitTransaction();

      this.logger.log(`Order cancelled: ${id}`);

      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Transform order entity to clean response format
   */
  private toOrderResponse(order: Order): SerializedOrder {
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

  /**
   * Transform ticket entity to clean response format
   */
  private toTicketResponse(ticket: Ticket): SerializedTicket {
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
}
