import { Controller, Post, Body, Get, Query, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentService } from '../services/payment.service';
import { BkashCallbackDto, CreatePaymentDto } from '../dto';
import { Public } from '../../../common/decorators/skip-auth.decorator';
import type { Response } from 'express';

@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  @Public()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'Payment created successfzully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @Get('bkash/callback')
  @Public()
  async bkashCallback(@Query() query: BkashCallbackDto, @Res() res: Response) {
    const result = await this.paymentService.handleBkashCallback(query);

    return res.redirect(
      `${process.env.FRONTEND_URL}/checkout/success?orderId=${result.orderId}&status=${result.status}`,
    );
  }
}
