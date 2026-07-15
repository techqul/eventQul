import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStatus } from './types';
import { ServiceResponse } from '../../common/utils/types';
export type { ServiceResponse } from '../../common/utils/types';
export declare class UsersService {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<ServiceResponse<User>>;
    register(registerDto: RegisterDto): Promise<ServiceResponse<User>>;
    findAll(page?: number, limit?: number): Promise<ServiceResponse<User[]>>;
    findOne(id: string): Promise<ServiceResponse<User>>;
    findByEmail(email: string): Promise<User | null>;
    getProfile(userId: string): Promise<ServiceResponse<User>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<ServiceResponse<User>>;
    updateLastLogin(id: string): Promise<void>;
    remove(id: string): Promise<ServiceResponse<void>>;
    updateStatus(id: string, status: UserStatus): Promise<ServiceResponse<User>>;
}
