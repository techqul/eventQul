import { BaseEntity } from '../../../common/entities/base.entity';
import { UserRole, UserStatus, BloodGroup, Gender, TShirtSize } from '../types';
export declare class User extends BaseEntity {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    nickName?: string;
    phoneNumber?: string;
    instituteName?: string;
    district?: string;
    dob?: string;
    bloodGroup?: BloodGroup;
    gender?: Gender;
    tshirtSize?: TShirtSize;
    role: UserRole;
    status: UserStatus;
    emailVerified: boolean;
    avatarUrl?: string;
    lastLoginAt?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    validatePassword(password: string): Promise<boolean>;
    toJSON(): Omit<this, "password" | "setCreatedAt" | "setUpdatedAt" | "validatePassword" | "toJSON">;
}
