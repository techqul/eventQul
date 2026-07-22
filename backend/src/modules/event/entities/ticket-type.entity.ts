import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Event } from './event.entity';
import { dateTransformer } from '../../../common/utils/helper';

@Entity('ticket_types')
export class TicketType {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Event, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event!: Event;

  @Column({ name: 'event_id' })
  eventId!: string;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column({ default: 'BDT' })
  currency!: string;

  @Column()
  available!: number;

  @Column({ name: 'max_per_purchase', default: 10 })
  maxPerPurchase!: number;

  @Column({ type: 'jsonb', default: '[]' })
  benefits!: string[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    transformer: dateTransformer,
  })
  declare createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    transformer: dateTransformer,
  })
  declare updatedAt: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    transformer: dateTransformer,
  })
  declare deletedAt?: string;
}
