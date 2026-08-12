import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * bKash Callback DTO
 * Handles both POST (callback) and GET (execute) requests from bKash
 */
export class BkashCallbackDto {
  @ApiPropertyOptional({
    example: 'TR00123ABC',
    description: 'bKash payment ID'
  })
  @IsString()
  @IsOptional()
  paymentID?: string;

  @ApiPropertyOptional({
    example: 'completed',
    description: 'Payment status'
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({
    example: '0000',
    description: 'bKash status code (0000 = success)'
  })
  @IsString()
  @IsOptional()
  statusCode?: string;

  @ApiPropertyOptional({
    example: 'Payment successful',
    description: 'Status message from bKash'
  })
  @IsString()
  @IsOptional()
  statusMessage?: string;

  @ApiPropertyOptional({
    example: '01700000000',
    description: 'Customer mobile number'
  })
  @IsString()
  @IsOptional()
  customerMsisdn?: string;

  @ApiPropertyOptional({
    example: 'INV-2024-001',
    description: 'Merchant invoice number'
  })
  @IsString()
  @IsOptional()
  merchantInvoiceNumber?: string;

  @ApiPropertyOptional({
    example: '500.00',
    description: 'Transaction amount'
  })
  @IsString()
  @IsOptional()
  amount?: string;

  @ApiPropertyOptional({
    example: 'BDT',
    description: 'Currency'
  })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiPropertyOptional({
    example: 'trx123abc',
    description: 'bKash transaction ID'
  })
  @IsString()
  @IsOptional()
  trxId?: string;

  @ApiPropertyOptional({
    description: 'Any additional metadata from bKash'
  })
  @IsOptional()
  metadata?: Record<string, any>;
}
