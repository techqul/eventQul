import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Event } from '../../event/entities/event.entity';
import { TicketType } from '../../event/entities/ticket-type.entity';
import { TicketStatus } from '../types/order-status.enum';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @Column({ name: 'order_id' })
  orderId!: string;

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'event_id' })
  event!: Event;

  @Column({ name: 'event_id' })
  eventId!: string;

  @ManyToOne(() => TicketType)
  @JoinColumn({ name: 'ticket_type_id' })
  ticketType!: TicketType;

  @Column({ name: 'ticket_type_id' })
  ticketTypeId!: string;

  @Column({ unique: true })
  qrCode!: string;

  @Column({ name: 'attendee_name' })
  attendeeName!: string;

  @Column({ name: 'attendee_email' })
  attendeeEmail!: string;

  @Column({ name: 'attendee_phone' })
  attendeePhone!: string;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.CONFIRMED,
  })
  status!: TicketStatus;

  @Column({ name: 'checked_in_at', type: 'timestamp', nullable: true })
  checkedInAt?: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  declare createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  declare updatedAt: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  declare deletedAt?: string;
}
