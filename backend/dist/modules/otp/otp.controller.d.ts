import { OtpService } from './otp.service';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { CreateOtpDto } from './dto/create-otp.dto';
import { SendOtpDto } from './dto/send-otp.dto';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    sendOtp(body: SendOtpDto): Promise<{
        message: any;
        statusCode: any;
        success: boolean;
    }>;
    verifyOtp(body: CreateOtpDto): Promise<{
        message: string;
        statusCode: number;
    } | undefined>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOtpDto: UpdateOtpDto): string;
    remove(id: string): string;
}
