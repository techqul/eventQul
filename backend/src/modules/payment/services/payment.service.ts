import { Injectable, Inject, forwardRef, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { PaymentProvider, PaymentStatus } from '../types/payment-provider.enum';
import { OrdersService } from '../../order/orders.service';
import { BkashService } from './bkash.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { CreatePaymentResponse } from '../interfaces/payment-provider.interface';
import { BkashCallbackDto } from '../dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
    private readonly bkashService: BkashService,
  ) {}

  async createPayment(dto: CreatePaymentDto): Promise<CreatePaymentResponse> {
    switch (dto.provider) {
      case PaymentProvider.BKASH: {
        /**
         * Create local payment first
         */
        const payment = await this.paymentRepository.save({
          provider: PaymentProvider.BKASH,
          amount: dto.amount,
          status: PaymentStatus.PENDING,
          paymentMethod: dto.paymentMethod,
        });

        /**
         * Create bKash payment
         */
        const result = await this.bkashService.createPayment({
          amount: dto.amount,
          payerReference: dto.payerReference,
        });

        if (!result.success) {
          // payment.status = PaymentStatus.FAILED;

          await this.paymentRepository.save(payment);

          throw new BadRequestException(result.message);
        }

        /**
         * Save bKash payment ID
         */
        payment.providerTransactionId = result.paymentId;

        await this.paymentRepository.save(payment);

        return result;
      }

      default:
        throw new BadRequestException(`Payment provider '${dto.provider}' not supported`);
    }
  }
  /**
   * Handle bKash callback
   */
  async handleBkashCallback(dto: BkashCallbackDto) {
    if (!dto.paymentID) {
      throw new BadRequestException('bKash paymentID is required');
    }

    const paymentID = dto.paymentID;

    /**
     * 1. Execute payment
     */
    const executeResult = await this.bkashService.executePayment(paymentID);

    /**
     * 2. Check transaction status
     */
    if (executeResult.statusCode !== '00000') {
      return {
        success: false,
        status: 'failed',
        orderId: null,
        paymentId: paymentID,
      };
    }

    /**
     * 3. Find payment by provider payment ID
     */
    const payment = await this.paymentRepository.findOne({
      where: {
        providerTransactionId: paymentID,
      },
    });

    if (!payment) {
      throw new BadRequestException('Payment record not found');
    }

    /**
     * 4. Idempotency check
     */
    if (payment.status === PaymentStatus.COMPLETED) {
      return {
        success: true,
        status: 'success',
        orderId: payment.orderId,
        paymentId: paymentID,
      };
    }

    /**
     * 5. Validate amount
     */
    const paidAmount = Number(executeResult.amount);

    const expectedAmount = Number(payment.amount);

    if (paidAmount !== expectedAmount) {
      throw new BadRequestException('Payment amount mismatch');
    }

    /**
     * 6. Update payment
     */
    payment.status = PaymentStatus.COMPLETED;

    payment.providerTransactionId = executeResult.paymentID;

    payment.completedAt = new Date();

    await this.paymentRepository.save(payment);

    /**
     * 7. Mark Order as PAID
     *
     * তোমার OrdersService-এর actual method
     * এখানে call করবে।
     */


    return {
      success: true,
      status: 'success',
      orderId: payment.orderId,
      paymentId: paymentID,
    };
  }
}
