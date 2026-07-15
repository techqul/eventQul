import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { ValueTransformer } from 'typeorm';

/**
 * Date transformer for TypeORM to properly serialize/deserialize dates
 */
const dateTransformer: ValueTransformer = {
  to(value?: Date): Date | string | null {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  },
  from(value?: string): Date | null {
    if (value) {
      return new Date(value);
    }
    return null;
  },
};

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    transformer: dateTransformer,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    transformer: dateTransformer,
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    transformer: dateTransformer,
  })
  deletedAt?: Date;
}
