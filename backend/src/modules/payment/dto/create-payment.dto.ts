import { IsString, IsNumber, IsOptional, IsUUID, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentMethod } from '../types/payment-provider.enum';

export class CreatePaymentDto {

  @ApiProperty({ example: 500.0, description: 'Payment amount in BDT' })
  @IsNumber()
  amount!: number;  
  
  @ApiProperty({ example: "01964907873", description: 'Payer mobile number' })
  @IsString()
  payerReference!: string;

  @ApiPropertyOptional({ example: 'bkash', description: 'Payment provider (bkash, sslcommerz)' })
  @IsString()
  @IsOptional()
  provider?: string;

  @ApiPropertyOptional({
    example: 'mobile_banking',
    description: 'Payment method type',
    enum: PaymentMethod
  })
  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod?: PaymentMethod;

  @ApiPropertyOptional({
    example: 'https://yourdomain.com/checkout/success',
    description: 'Callback URL after payment completion'
  })
  @IsString()
  @IsOptional()
  callbackUrl?: string;

}
