import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { ValueTransformer } from 'typeorm';

/**
 * Date transformer for TypeORM to properly serialize/deserialize dates
 * Converts Date objects to ISO strings for proper JSON serialization
 */
export const dateTransformer: ValueTransformer = {
  to(value?: Date | string): Date | string | null {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value ?? null;
  },
  from(value?: string | Date): string | null {
    if (!value) return null;
    // If it's already a Date, convert to ISO string
    if (value instanceof Date) {
      return value.toISOString();
    }
    // If it's a string, return it as-is (it should already be ISO format from DB)
    return value;
  },
};

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    transformer: dateTransformer,
  })
  createdAt!: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    transformer: dateTransformer,
  })
  updatedAt!: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    transformer: dateTransformer,
  })
  deletedAt?: string;

  @BeforeInsert()
  setCreatedAt() {
    if (!this.createdAt) {
      this.createdAt = new Date().toISOString();
    }
    if (!this.updatedAt) {
      this.updatedAt = new Date().toISOString();
    }
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date().toISOString();
  }
}
