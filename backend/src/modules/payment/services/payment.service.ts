import { Injectable, Inject, forwardRef, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { PaymentProvider } from '../types/payment-provider.enum';
import { OrdersService } from '../../order/orders.service';
import { BkashService } from './bkash.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { CreatePaymentResponse } from '../interfaces/payment-provider.interface';

@Injectable()
export class PaymentService {

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
    private readonly bkashService: BkashService
  ) {}

  async createPayment(
    dto: CreatePaymentDto,
  ): Promise<CreatePaymentResponse> {
    if (dto.provider === PaymentProvider.BKASH) {
      return this.bkashService.createPayment({
        amount: dto.amount,
        callbackUrl: dto.callbackUrl,
        payerReference: dto.payerReference,
      });
    }

    throw new BadRequestException(`Payment provider '${dto.provider}' not supported`);
  }
}
