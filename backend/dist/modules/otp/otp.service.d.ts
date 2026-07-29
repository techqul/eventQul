import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CreateOtpDto } from './dto/create-otp.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { Otp } from './entities/otp.entity';
export declare class OtpService {
    private readonly otpRepository;
    private readonly configService;
    constructor(otpRepository: Repository<Otp>, configService: ConfigService);
    generateOtp(): string;
    sendOtp(obj: SendOtpDto, customMessage?: string): Promise<{
        message: any;
        statusCode: any;
        success: boolean;
    }>;
    verifyOtp(createOtpDto: CreateOtpDto): Promise<{
        message: string;
        statusCode: number;
    } | undefined>;
    create(createOtpDto: CreateOtpDto): Promise<{
        message: string;
        statusCode: number;
    } | undefined>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOtpDto: UpdateOtpDto): string;
    remove(id: number): string;
}
