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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { Public } from '../../common/decorators/skip-auth.decorator';
import { UserRole } from '../users/types';

@ApiTags('Venues')
@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Venue created successfully')
  @ApiOperation({ summary: 'Create a new venue (Organizer/Admin only)' })
  @ApiResponse({ status: 201, description: 'Venue created successfully' })
  @ApiResponse({ status: 409, description: 'Venue with this slug already exists' })
  async create(@Body() createVenueDto: CreateVenueDto) {
    return this.venuesService.create(createVenueDto);
  }

  @Get()
  @Public()
  @ResponseMessage('Venues retrieved successfully')
  @ApiOperation({ summary: 'Get all venues (Public)' })
  @ApiResponse({ status: 200, description: 'Venues retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 20;
    return this.venuesService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  @Public()
  @ResponseMessage('Venue retrieved successfully')
  @ApiOperation({ summary: 'Get venue by ID (Public)' })
  @ApiResponse({ status: 200, description: 'Venue retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Venue not found' })
  async findOne(@Param('id') id: string) {
    return this.venuesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Venue updated successfully')
  @ApiOperation({ summary: 'Update venue (Organizer/Admin only)' })
  @ApiResponse({ status: 200, description: 'Venue updated successfully' })
  @ApiResponse({ status: 404, description: 'Venue not found' })
  @ApiResponse({ status: 409, description: 'Venue with this slug already exists' })
  async update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venuesService.update(id, updateVenueDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Venue deleted successfully')
  @ApiOperation({ summary: 'Delete venue (Admin only)' })
  @ApiResponse({ status: 200, description: 'Venue deleted successfully' })
  @ApiResponse({ status: 404, description: 'Venue not found' })
  async remove(@Param('id') id: string) {
    await this.venuesService.remove(id);
    return { success: true };
  }
}
