import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOtpDto {
  @ApiProperty({ example: '01334567890', description: 'Mobile number' })
  @IsNotEmpty()
  @IsString()
  mobileNo: string;

  @ApiProperty({ example: '1234', description: 'OTP' })
  @IsNotEmpty()
  @IsString()
  otp: string;
}
