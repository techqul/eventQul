import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Order } from '../../order/entities/order.entity';
import { PaymentProvider, PaymentStatus, PaymentMethod } from '../types/payment-provider.enum';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @Column({ name: 'order_id' })
  orderId!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'user_id' })
  userId!: string;

  @Column({
    type: 'enum',
    enum: PaymentProvider,
  })
  provider!: PaymentProvider;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
    name: 'payment_method',
  })
  paymentMethod!: PaymentMethod;

  /**
   * Provider's transaction ID
   * For bKash: paymentID
   * For SSLCommerz: tran_id
   */
  @Column({ name: 'provider_transaction_id', nullable: true })
  providerTransactionId?: string;

  /**
   * bKash specific: Invoice ID
   */
  @Column({ name: 'invoice_id', nullable: true })
  invoiceId?: string;

  /**
   * Store additional provider-specific data
   * For example: gateway response, callback data, etc.
   */
  @Column({ type: 'jsonb', default: {} })
  metadata!: Record<string, any>;

  /**
   * Error message if payment failed
   */
  @Column({ name: 'error_message', nullable: true })
  errorMessage?: string;

  /**
   * Timestamp when payment was completed
   */
  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt?: Date;

  /**
   * Timestamp when payment was refunded
   */
  @Column({ name: 'refunded_at', type: 'timestamp', nullable: true })
  refundedAt?: Date;

  @Index(['provider', 'status'])
  @Column({ name: 'expires_at', type: 'timestamp', nullable: true })
  expiresAt?: Date;

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
}
