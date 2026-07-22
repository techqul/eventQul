import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { dateTransformer } from '../../../common/utils/helper';

@Entity('venues')
export class Venue {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column()
  city!: string;

  @Column()
  area!: string;

  @Column()
  capacity!: number;

  @Column({ name: 'map_image', nullable: true })
  mapImage?: string;

  @Column({ type: 'jsonb', default: '[]' })
  facilities!: string[];

  @Column({ type: 'jsonb', nullable: true })
  coordinates?: {
    lat: number;
    lng: number;
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
