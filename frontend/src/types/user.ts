export interface User {
  id: string;
  email: string;
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
  lastLoginAt?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: Date | string | null;
}

export enum UserRole {
  USER = 'user',
  ORGANIZER = 'organizer',
  ADMIN = 'admin',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

export enum BloodGroup {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum TShirtSize {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  XXXL = 'XXXL',
}

export interface CreateUserDto {
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
  role?: UserRole;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  nickName?: string;
  phoneNumber?: string;
  instituteName?: string;
  district?: string;
  dob?: string;
  bloodGroup?: BloodGroup;
  gender?: Gender;
  tshirtSize?: TShirtSize;
  avatarUrl?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
  };
}

export interface ServiceResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UsersListResponse extends ServiceResponse<User[]> {}

export interface UserResponse extends ServiceResponse<User> {}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'event_reminder' | 'ticket';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}
