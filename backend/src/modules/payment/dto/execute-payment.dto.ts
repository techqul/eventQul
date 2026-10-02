import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExecutePaymentDto {
  @ApiProperty({ example: 'uuid-payment-id' })
  @IsUUID()
  paymentId!: string;

  @ApiProperty({ example: 'TR00123ABC', description: 'Provider transaction ID (paymentID from bKash)' })
  @IsString()
  providerTransactionId!: string;
}
