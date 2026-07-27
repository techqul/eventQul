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
import { Organizer } from '../../organizer/entities/organizer.entity';
import { Venue } from '../../venue/entities/venue.entity';
import { Category } from '../../category/entities/category.entity';
import { TicketType } from './ticket-type.entity';
import { EventStatus } from '../types/event-status.enum';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Organizer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizer_id' })
  organizer!: Organizer;

  @Column({ name: 'organizer_id' })
  organizerId!: string;

  @ManyToOne(() => Venue)
  @JoinColumn({ name: 'venue_id' })
  venue!: Venue;

  @Column({ name: 'venue_id' })
  venueId!: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @Column({ name: 'category_id' })
  categoryId!: string;

  @OneToMany(() => TicketType, (ticketType) => ticketType.event, { cascade: true })
  ticketTypes!: TicketType[];

  @Column({ unique: true })
  slug!: string;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ name: 'long_description', type: 'text', nullable: true })
  longDescription?: string;

  @Column({ name: 'cover_image', nullable: true })
  coverImage?: string;

  @Column({ type: 'jsonb', default: '[]' })
  gallery!: string[];

  @Column({ name: 'start_date', type: 'timestamp' })
  startDate!: Date;

  @Column({ name: 'end_date', type: 'timestamp' })
  endDate!: Date;

  @Column()
  timezone!: string;

  @Column()
  capacity!: number;

  @Column({ name: 'sold_tickets', default: 0 })
  soldTickets!: number;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.UPCOMING,
  })
  status!: EventStatus;

  @Column({ default: false })
  featured!: boolean;

  @Column({ default: false })
  trending!: boolean;

  @Column({ type: 'jsonb', default: '[]' })
  tags!: string[];

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
