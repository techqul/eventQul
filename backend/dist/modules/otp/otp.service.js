"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = __importDefault(require("axios"));
const typeorm_2 = require("typeorm");
const create_otp_dto_1 = require("./dto/create-otp.dto");
const otp_entity_1 = require("./entities/otp.entity");
let OtpService = class OtpService {
    otpRepository;
    configService;
    constructor(otpRepository, configService) {
        this.otpRepository = otpRepository;
        this.configService = configService;
    }
    generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async sendOtp(obj, customMessage) {
        const apiKey = this.configService.get('SMS_API_KEY');
        const senderApiKey = this.configService.get('SMS_API_SENDER_KEY');
        const defaultMessage = this.configService.get('SMS_API_MESSAGE');
        const { mobileNo } = obj;
        try {
            const otp = this.generateOtp();
            const createOtpDto = new create_otp_dto_1.CreateOtpDto();
            createOtpDto.otp = otp;
            createOtpDto.mobileNo = mobileNo;
            const smsApiUrl = `https://netsmsbd.com/v1.1/sms`;
            const msgBody = customMessage || (defaultMessage + ': ' + otp);
            const data = {
                apiKey: apiKey,
                senderId: senderApiKey,
                mobileNo: mobileNo,
                msgBody: msgBody,
            };
            const response = await axios_1.default.post(smsApiUrl, data, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('response', response);
            if (response.data[0].statusCode === '1000') {
                if (!customMessage) {
                    const res = await this.otpRepository.save(createOtpDto);
                }
                return {
                    message: 'Message sent successfully',
                    statusCode: 200,
                    success: true,
                };
            }
            else {
                const msg = response?.data[0]?.statusMsg;
                const code = response?.data[0]?.statusCode;
                return {
                    message: msg,
                    statusCode: code,
                    success: false,
                };
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async verifyOtp(createOtpDto) {
        try {
            const { mobileNo, otp } = createOtpDto;
            const res = await this.otpRepository.findOne({
                where: { mobileNo, otp },
            });
            if (!res) {
                throw new common_1.BadRequestException('Invalid OTP');
            }
            const currentTime = new Date();
            const otpCreationtime = new Date(res.createdAt);
            const diff = (currentTime.getTime() - otpCreationtime.getTime()) / 1000 / 60;
            console.log('dif', diff);
            if (diff > 2) {
                throw new common_1.BadRequestException('OTP expired');
            }
            if (res.id) {
                return {
                    message: 'OTP verified successfully',
                    statusCode: 200,
                };
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async create(createOtpDto) {
        try {
            const res = await this.otpRepository.save(createOtpDto);
            if (res) {
                return {
                    message: 'OTP sent successfully',
                    statusCode: 200,
                };
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    findAll() {
        return `This action returns all otp`;
    }
    findOne(id) {
        return `This action returns a #${id} otp`;
    }
    update(id, updateOtpDto) {
        return `This action updates a #${id} otp`;
    }
    remove(id) {
        return `This action removes a #${id} otp`;
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(otp_entity_1.Otp)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], OtpService);
//# sourceMappingURL=otp.service.js.map