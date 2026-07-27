import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController, TicketTypesController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { TicketType } from './entities/ticket-type.entity';
import { Organizer } from '../organizer/entities/organizer.entity';
import { Venue } from '../venue/entities/venue.entity';
import { Category } from '../category/entities/category.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event, TicketType, Organizer, Venue, Category]), AuthModule],
  controllers: [EventsController, TicketTypesController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
