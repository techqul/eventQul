import { UsersService } from './users.service';
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
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    register(registerDto: RegisterDto): Promise<import("./entities/user.entity").User>;
    findAll(page?: string, limit?: string): Promise<import("./users.service").PaginatedResult<import("./entities/user.entity").User>>;
    getProfile(req: AuthenticatedRequest): Promise<import("./entities/user.entity").User>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    updateProfile(req: AuthenticatedRequest, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
export {};
