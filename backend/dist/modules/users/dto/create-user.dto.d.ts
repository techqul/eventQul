import { UserRole, BloodGroup, Gender, TShirtSize } from '../types';
export declare class CreateUserDto {
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
}
export declare class RegisterDto extends CreateUserDto {
    role?: UserRole;
}
