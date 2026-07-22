import { PartialType } from '@nestjs/swagger';
import { CreateTicketTypeDto } from './create-event.dto';

export class UpdateTicketTypeDto extends PartialType(CreateTicketTypeDto) {}
