import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStatus } from './types';
export interface PaginatedResult<T> {
    data: T[];
    page: number;
    size: number;
    total: number;
}
export declare class UsersService {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    register(registerDto: RegisterDto): Promise<User>;
    findAll(page?: number, limit?: number): Promise<PaginatedResult<User>>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    getProfile(userId: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    updateLastLogin(id: string): Promise<void>;
    remove(id: string): Promise<void>;
    updateStatus(id: string, status: UserStatus): Promise<User>;
}
