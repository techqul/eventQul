import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { dateTransformer } from '../../../common/utils/helper';

@Entity('organizers')
export class Organizer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'user_id', unique: true })
  userId!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  logo?: string;

  @Column({ nullable: true })
  banner?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'is_verified', default: false })
  isVerified!: boolean;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0.00 })
  rating!: number;

  @Column({ name: 'total_events', default: 0 })
  totalEvents!: number;

  @Column({ default: 0 })
  followers!: number;

  @Column({ name: 'commission_rate', type: 'decimal', precision: 5, scale: 2, default: 10.00 })
  commissionRate!: number;

  @Column({ type: 'jsonb', default: '{}' })
  socialLinks!: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };

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
