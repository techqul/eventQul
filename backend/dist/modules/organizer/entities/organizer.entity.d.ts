import { User } from '../../users/entities/user.entity';
export declare class Organizer {
    id: string;
    user: User;
    userId: string;
    slug: string;
    name: string;
    logo?: string;
    banner?: string;
    description?: string;
    isVerified: boolean;
    rating: number;
    totalEvents: number;
    followers: number;
    commissionRate: number;
    socialLinks: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        website?: string;
    };
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}
