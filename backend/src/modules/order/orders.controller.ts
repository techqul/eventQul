import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { Public } from '../../common/decorators/skip-auth.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../users/types';
import { OrderStatus } from './types/order-status.enum';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Order created successfully')
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - invalid input or not enough tickets' })
  async create(@CurrentUser() user: any, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(user.id, createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Orders retrieved successfully')
  @ApiOperation({ summary: 'Get user orders' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @CurrentUser() user: any,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
  ) {
    return this.ordersService.findByUser(user.id, page, limit);
  }

  @Get('my-tickets')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Tickets retrieved successfully')
  @ApiOperation({ summary: 'Get user tickets' })
  @ApiResponse({ status: 200, description: 'Tickets retrieved successfully' })
  async getMyTickets(@CurrentUser() user: any) {
    return this.ordersService.getUserTickets(user.id);
  }

  @Get(':orderNumber')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Order retrieved successfully')
  @ApiOperation({ summary: 'Get order by order number' })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async findOne(@Param('orderNumber') orderNumber: string, @CurrentUser() user: any) {
    const order = await this.ordersService.findByOrderNumber(orderNumber);
    if (!order) {
      throw new Error('Order not found');
    }
    // Check if user owns this order or is admin
    if (order.userId !== user.id && user.role !== UserRole.ADMIN) {
      throw new Error('Access denied');
    }
    return order;
  }

  @Patch(':orderNumber/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Order status updated successfully')
  @ApiOperation({ summary: 'Update order status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Order status updated successfully' })
  async updateStatus(
    @Param('orderNumber') orderNumber: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    const order = await this.ordersService.findByOrderNumber(orderNumber);
    if (!order) {
      throw new Error('Order not found');
    }
    return this.ordersService.updateStatus(order.id, updateOrderStatusDto.status);
  }

  @Post(':orderNumber/cancel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Order cancelled successfully')
  @ApiOperation({ summary: 'Cancel order' })
  @ApiResponse({ status: 200, description: 'Order cancelled successfully' })
  @ApiResponse({ status: 400, description: 'Order cannot be cancelled' })
  async cancelOrder(@Param('orderNumber') orderNumber: string, @CurrentUser() user: any) {
    const order = await this.ordersService.findByOrderNumber(orderNumber);
    if (!order) {
      throw new Error('Order not found');
    }
    // Check if user owns this order or is admin
    if (order.userId !== user.id && user.role !== UserRole.ADMIN) {
      throw new Error('Access denied');
    }
    return this.ordersService.cancelOrder(order.id);
  }
}

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(':qrCode/verify')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Ticket verified successfully')
  @ApiOperation({ summary: 'Verify ticket by QR code (Organizer/Admin only)' })
  @ApiResponse({ status: 200, description: 'Ticket verified successfully' })
  @ApiResponse({ status: 404, description: 'Ticket not found' })
  @ApiResponse({ status: 409, description: 'Ticket already used' })
  async verifyTicket(@Param('qrCode') qrCode: string) {
    return this.ordersService.verifyTicket(qrCode);
  }

  @Post(':qrCode/check-in')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Ticket checked in successfully')
  @ApiOperation({ summary: 'Check in ticket by QR code (Organizer/Admin only)' })
  @ApiResponse({ status: 200, description: 'Ticket checked in successfully' })
  @ApiResponse({ status: 404, description: 'Ticket not found' })
  @ApiResponse({ status: 409, description: 'Ticket already used or invalid status' })
  async checkInTicket(@Param('qrCode') qrCode: string) {
    return this.ordersService.checkInTicket(qrCode);
  }
}
