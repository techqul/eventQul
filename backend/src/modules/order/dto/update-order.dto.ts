import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['tickets', 'attendeeName', 'attendeeEmail', 'attendeePhone'] as const),
) {}
