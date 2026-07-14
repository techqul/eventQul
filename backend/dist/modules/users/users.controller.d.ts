import { UsersService } from './users.service';
import { CreateUserDto, RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/user.entity").User;
    }>;
    register(registerDto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/user.entity").User;
    }>;
    findAll(req: any): Promise<{
        data: import("./entities/user.entity").User[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
        success: boolean;
        message: string;
    }>;
    getProfile(req: any): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/user.entity").User;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/user.entity").User;
    }>;
    updateProfile(req: any, updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/user.entity").User;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/user.entity").User;
    }>;
    remove(id: string): Promise<void>;
}
