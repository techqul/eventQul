import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  Min,
  ValidateNested,
  IsOptional,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class TicketItemDto {
  @ApiProperty({ example: 'ticket-type-id' })
  @IsString()
  @IsNotEmpty()
  ticketTypeId!: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  quantity!: number;
}

export class CreateOrderDto {
  @ApiProperty({
    type: [TicketItemDto],
    description: 'Array of ticket types and quantities'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketItemDto)
  tickets!: TicketItemDto[];

  @ApiPropertyOptional({ example: 'SAVE20' })
  @IsString()
  @IsOptional()
  couponCode?: string;

  @ApiPropertyOptional({ example: 'bkash' })
  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Attendee name for all tickets'
  })
  @IsString()
  @IsNotEmpty()
  attendeeName!: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Attendee email for all tickets'
  })
  @IsEmail()
  @IsNotEmpty()
  attendeeEmail!: string;

  @ApiProperty({
    example: '+8801234567890',
    description: 'Attendee phone for all tickets'
  })
  @IsString()
  @IsNotEmpty()
  attendeePhone!: string;
}
