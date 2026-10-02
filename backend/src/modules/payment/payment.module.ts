import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { PaymentConfigService } from './services/payment-config.service';
import { BkashService } from './services/bkash.service';
import { Payment } from './entities/payment.entity';
import { Order } from '../order/entities/order.entity';
import { User } from '../users/entities/user.entity';
import { OrdersModule } from '../order/orders.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Order, User]),
    ConfigModule,
    forwardRef(() => OrdersModule),
    AuthModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentConfigService, BkashService],
  exports: [PaymentService, PaymentConfigService],
})
export class PaymentModule{}