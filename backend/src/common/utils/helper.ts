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
