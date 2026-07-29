import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController, TicketsController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { Ticket } from './entities/ticket.entity';
import { TicketType } from '../event/entities/ticket-type.entity';
import { Event } from '../event/entities/event.entity';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Ticket, TicketType, Event, User]),
    AuthModule,
    OtpModule,
  ],
  controllers: [OrdersController, TicketsController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
