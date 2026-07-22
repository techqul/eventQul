import { ValueTransformer } from 'typeorm';
export declare const dateTransformer: ValueTransformer;
export declare abstract class BaseEntity {
    setCreatedAt(): void;
    setUpdatedAt(): void;
}
