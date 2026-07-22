import { BaseEntity } from '../../../common/entities/base.entity';
export declare class Category extends BaseEntity {
    id: string;
    slug: string;
    name: string;
    nameBengali?: string;
    icon?: string;
    color?: string;
    eventCount: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}
