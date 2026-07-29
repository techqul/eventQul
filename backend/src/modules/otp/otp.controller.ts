import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateOtpDto } from './dto/create-otp.dto';
import { SendOtpDto } from './dto/send-otp.dto';

@ApiTags('Otp')
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send')
  sendOtp(@Body() body: SendOtpDto) {
    return this.otpService.sendOtp(body);
  }

  @Post('verify')
  verifyOtp(@Body() body: CreateOtpDto) {
    return this.otpService.verifyOtp(body);
  }

  @Get()
  findAll() {
    return this.otpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOtpDto: UpdateOtpDto) {
    return this.otpService.update(+id, updateOtpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otpService.remove(+id);
  }
}
