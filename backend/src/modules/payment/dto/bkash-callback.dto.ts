import { IsOptional, IsString } from 'class-validator';

export class BkashCallbackDto {
  @IsString()
  @IsOptional()
  paymentID?: string;

  @IsString()
  @IsOptional()
  statusMessage?: string;

  @IsString()
  @IsOptional()
  payerReference?: string;
  
  @IsString()
  @IsOptional()
  statusCode?: string;
}