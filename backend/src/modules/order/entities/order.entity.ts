import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ticket } from './ticket.entity';
import { OrderStatus } from '../types/order-status.enum';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'user_id' })
  userId!: string;

  @OneToMany(() => Ticket, (ticket) => ticket.order, { cascade: true })
  tickets!: Ticket[];

  @Column({ unique: true })
  orderNumber!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  subtotal!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total!: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status!: OrderStatus;

  @Column({ name: 'coupon_code', nullable: true })
  couponCode?: string;

  @Column({ name: 'payment_method', nullable: true })
  paymentMethod?: string;

  @Column({ name: 'payment_status', default: 'pending' })
  paymentStatus!: string;

  @Column({ name: 'paid_at', type: 'timestamp', nullable: true })
  paidAt?: Date;

  @Column({ type: 'jsonb', default: '{}' })
  metadata!: Record<string, any>;

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
