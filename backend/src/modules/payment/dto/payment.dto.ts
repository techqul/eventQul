import {
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  IsEnum,
  IsArray,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentProvider, PaymentMethod } from '../../payment/types/payment-provider.enum';

export class InitiatePaymentDto {
  @ApiProperty({ example: 'uuid-order-id' })
  @IsUUID()
  @IsNotEmpty()
  orderId!: string;

  @ApiPropertyOptional({ example: 'bkash', description: 'Payment provider' })
  @IsEnum(PaymentProvider)
  @IsOptional()
  provider?: PaymentProvider;

  @ApiPropertyOptional({
    example: 'mobile_banking',
    description: 'Payment method',
    enum: PaymentMethod
  })
  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod?: PaymentMethod;

  @ApiPropertyOptional({
    example: 'https://yourdomain.com/payment/callback',
    description: 'Callback URL'
  })
  @IsString()
  @IsOptional()
  callbackUrl?: string;

  @ApiProperty({ example: 500.0, description: 'Payment amount (optional, will be calculated from order)' })
  @IsNumber()
  @IsOptional()
  amount?: number;
}

export class CreatePendingOrderDto {
  @ApiProperty({ example: 'uuid-ticket-type-id' })
  @IsUUID()
  ticketTypeId!: string;

  @ApiProperty({ example: 2, description: 'Number of tickets' })
  @IsNumber()
  quantity!: number;
}

export class AttendeeInfoDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: '01700000000' })
  @IsString()
  @IsNotEmpty()
  phone!: string;
}
