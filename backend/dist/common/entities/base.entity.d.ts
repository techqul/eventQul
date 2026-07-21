import { ValueTransformer } from 'typeorm';
export declare const dateTransformer: ValueTransformer;
export declare abstract class BaseEntity {
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    setCreatedAt(): void;
    setUpdatedAt(): void;
}
