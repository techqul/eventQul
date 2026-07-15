import { UsersService } from './users.service';
import { ServiceResponse } from '../../common/utils/types';
import { CreateUserDto, RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        sub: string;
        email: string;
        role: string;
    };
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<ServiceResponse>;
    register(registerDto: RegisterDto): Promise<ServiceResponse>;
    findAll(page?: string, limit?: string): Promise<ServiceResponse>;
    getProfile(req: AuthenticatedRequest): Promise<ServiceResponse>;
    findOne(id: string): Promise<ServiceResponse>;
    updateProfile(req: AuthenticatedRequest, updateUserDto: UpdateUserDto): Promise<ServiceResponse>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<ServiceResponse>;
    remove(id: string): Promise<ServiceResponse>;
}
export {};
