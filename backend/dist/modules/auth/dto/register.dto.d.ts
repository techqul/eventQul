import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UserRole } from '../../users/types';
export declare class RegisterDto extends CreateUserDto {
    role?: UserRole;
}
