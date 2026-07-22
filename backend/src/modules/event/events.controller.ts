import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateTicketTypeDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { Public } from '../../common/decorators/skip-auth.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../users/types';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Event created successfully')
  @ApiOperation({ summary: 'Create a new event (Organizer/Admin only)' })
  @ApiResponse({ status: 201, description: 'Event created successfully' })
  @ApiResponse({ status: 409, description: 'Event with this slug already exists' })
  async create(@CurrentUser() user: any, @Body() createEventDto: CreateEventDto) {
    // For admin, they can create for any organizer
    // For organizer, they can only create for their own profile
    return this.eventsService.create(createEventDto, user.id);
  }

  @Get()
  @Public()
  @ResponseMessage('Events retrieved successfully')
  @ApiOperation({ summary: 'Get all events (Public with filters)' })
  @ApiResponse({ status: 200, description: 'Events retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'featured', required: false, type: Boolean })
  @ApiQuery({ name: 'trending', required: false, type: Boolean })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('status') status?: string,
    @Query('featured') featured?: string,
    @Query('trending') trending?: string,
  ) {
    const filters = { search, category, status, featured, trending };
    return this.eventsService.findAll(page, limit, filters);
  }

  @Get(':slug')
  @Public()
  @ResponseMessage('Event retrieved successfully')
  @ApiOperation({ summary: 'Get event by slug (Public)' })
  @ApiResponse({ status: 200, description: 'Event retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async findOne(@Param('slug') slug: string) {
    return this.eventsService.findBySlug(slug);
  }

  @Patch(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Event updated successfully')
  @ApiOperation({ summary: 'Update event (Owner/Admin only)' })
  @ApiResponse({ status: 200, description: 'Event updated successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async update(@Param('slug') slug: string, @Body() updateEventDto: UpdateEventDto) {
    const event = await this.eventsService.findBySlug(slug);
    if (!event) {
      throw new Error('Event not found');
    }
    return this.eventsService.update(event.id, updateEventDto);
  }

  @Delete(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Event deleted successfully')
  @ApiOperation({ summary: 'Delete event (Owner/Admin only)' })
  @ApiResponse({ status: 200, description: 'Event deleted successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async remove(@Param('slug') slug: string) {
    const event = await this.eventsService.findBySlug(slug);
    if (!event) {
      throw new Error('Event not found');
    }
    await this.eventsService.remove(event.id);
    return { success: true };
  }

  // Ticket Type endpoints
  @Post(':slug/ticket-types')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Ticket type added successfully')
  @ApiOperation({ summary: 'Add ticket type to event (Owner/Admin only)' })
  @ApiResponse({ status: 201, description: 'Ticket type added successfully' })
  async addTicketType(@Param('slug') slug: string, @Body() createTicketTypeDto: CreateTicketTypeDto) {
    const event = await this.eventsService.findBySlug(slug);
    if (!event) {
      throw new Error('Event not found');
    }
    return this.eventsService.addTicketType(event.id, createTicketTypeDto);
  }

  @Get(':slug/ticket-types')
  @Public()
  @ResponseMessage('Ticket types retrieved successfully')
  @ApiOperation({ summary: 'Get ticket types for event (Public)' })
  @ApiResponse({ status: 200, description: 'Ticket types retrieved successfully' })
  async getTicketTypes(@Param('slug') slug: string) {
    const event = await this.eventsService.findBySlug(slug);
    if (!event) {
      throw new Error('Event not found');
    }
    return event.ticketTypes;
  }
}

// Separate controller for ticket types direct access
@ApiTags('Ticket Types')
@Controller('ticket-types')
export class TicketTypesController {
  constructor(private readonly eventsService: EventsService) {}

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Ticket type updated successfully')
  @ApiOperation({ summary: 'Update ticket type (Owner/Admin only)' })
  @ApiResponse({ status: 200, description: 'Ticket type updated successfully' })
  async update(@Param('id') id: string, @Body() updateTicketTypeDto: any) {
    return this.eventsService.updateTicketType(id, updateTicketTypeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Ticket type deleted successfully')
  @ApiOperation({ summary: 'Delete ticket type (Owner/Admin only)' })
  @ApiResponse({ status: 200, description: 'Ticket type deleted successfully' })
  async remove(@Param('id') id: string) {
    await this.eventsService.removeTicketType(id);
    return { success: true };
  }
}
