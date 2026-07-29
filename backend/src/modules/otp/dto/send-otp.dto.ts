import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendOtpDto {
  @ApiProperty({ example: '01334567890', description: 'Mobile number' })
  @IsString()
  @IsNotEmpty()
  mobileNo: string;
}
