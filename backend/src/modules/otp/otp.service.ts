import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { CreateOtpDto } from './dto/create-otp.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { Otp } from './entities/otp.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private readonly configService: ConfigService,
  ) {}

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOtp(obj: SendOtpDto, customMessage?: string) {
    const apiKey = this.configService.get<string>('SMS_API_KEY');
    const senderApiKey = this.configService.get<string>('SMS_API_SENDER_KEY');
    const defaultMessage = this.configService.get<string>('SMS_API_MESSAGE');

    const { mobileNo } = obj;
    try {
      const otp = this.generateOtp();
      const createOtpDto = new CreateOtpDto();
      createOtpDto.otp = otp;
      createOtpDto.mobileNo = mobileNo;

      const smsApiUrl = `http://bulksmsbd.net/api/smsapi`;
      // const smsApiUrl = `https://netsmsbd.com/v1.1/sms`;

      // Use custom message if provided, otherwise use default OTP message
      const msgBody = customMessage || (defaultMessage + ': ' + otp);

      const data = {
        api_key: apiKey,
        senderid: senderApiKey,
        number: mobileNo,
        message: msgBody,
      };

      const response = await axios.post(smsApiUrl, data, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data[0].statusCode === '1000') {
        // Only save OTP record if it's an actual OTP message
        if (!customMessage) {
          const res: any = await this.otpRepository.save(createOtpDto);
        }

        return {
          message: 'Message sent successfully',
          statusCode: 200,
          success: true,
        };
      } else {
        const msg = response?.data[0]?.statusMsg;
        const code = response?.data[0]?.statusCode;
        return {
          message: msg,
          statusCode: code,
          success: false,
        };
      }
    } catch (error:any) {
      throw new BadRequestException(error.message);
    }
  }

  async verifyOtp(createOtpDto: CreateOtpDto) {
    try {
      const { mobileNo, otp } = createOtpDto;
      const res: any = await this.otpRepository.findOne({
        where: { mobileNo, otp },
      });

      // Check if OTP record exists
      if (!res) {
        throw new BadRequestException('Invalid OTP');
      }

      const currentTime = new Date();
      const otpCreationtime = new Date(res.createdAt);
      const diff =
        (currentTime.getTime() - otpCreationtime.getTime()) / 1000 / 60;
      console.log('dif', diff);

      if (diff > 2) {
        throw new BadRequestException('OTP expired');
      }

      if (res.id) {
        return {
          message: 'OTP verified successfully',
          statusCode: 200,
        };
      }
    } catch (error:any) {
      throw new BadRequestException(error.message);
    }
  }

  async create(createOtpDto: CreateOtpDto) {
    try {
      const res = await this.otpRepository.save(createOtpDto);
      if (res) {
        return {
          message: 'OTP sent successfully',
          statusCode: 200,
        };
      }
    } catch (error:any) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all otp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} otp`;
  }

  update(id: number, updateOtpDto: UpdateOtpDto) {
    return `This action updates a #${id} otp`;
  }

  remove(id: number) {
    return `This action removes a #${id} otp`;
  }
}
