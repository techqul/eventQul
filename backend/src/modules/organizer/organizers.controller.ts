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
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { OrganizersService } from './organizers.service';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { Public } from '../../common/decorators/skip-auth.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../users/types';

@ApiTags('Organizers')
@Controller('organizers')
export class OrganizersController {
  constructor(private readonly organizersService: OrganizersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Organizer profile created successfully')
  @ApiOperation({ summary: 'Create organizer profile' })
  @ApiResponse({ status: 201, description: 'Organizer profile created successfully' })
  @ApiResponse({ status: 409, description: 'User already has an organizer profile' })
  async create(@CurrentUser() user: any, @Body() createOrganizerDto: CreateOrganizerDto) {
    return this.organizersService.create(user.id, createOrganizerDto);
  }

  @Get()
  @Public()
  @ResponseMessage('Organizers retrieved successfully')
  @ApiOperation({ summary: 'Get all organizers (Public)' })
  @ApiResponse({ status: 200, description: 'Organizers retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 20;
    return this.organizersService.findAll(pageNum, limitNum);
  }

  @Get(':slug')
  @Public()
  @ResponseMessage('Organizer retrieved successfully')
  @ApiOperation({ summary: 'Get organizer by slug (Public)' })
  @ApiResponse({ status: 200, description: 'Organizer retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Organizer not found' })
  async findOne(@Param('slug') slug: string) {
    return this.organizersService.findBySlug(slug);
  }

  @Patch(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Organizer updated successfully')
  @ApiOperation({ summary: 'Update organizer (Owner/Admin only)' })
  @ApiResponse({ status: 200, description: 'Organizer updated successfully' })
  @ApiResponse({ status: 404, description: 'Organizer not found' })
  async update(@Param('slug') slug: string, @Body() updateOrganizerDto: UpdateOrganizerDto) {
    const organizer = await this.organizersService.findBySlug(slug);
    if (!organizer) {
      throw new Error('Organizer not found');
    }
    return this.organizersService.update(organizer.id, updateOrganizerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Organizer deleted successfully')
  @ApiOperation({ summary: 'Delete organizer (Admin only)' })
  @ApiResponse({ status: 200, description: 'Organizer deleted successfully' })
  @ApiResponse({ status: 404, description: 'Organizer not found' })
  async remove(@Param('id') id: string) {
    const organizer = await this.organizersService.findOne(id);
    if (!organizer) {
      throw new Error('Organizer not found');
    }
    await this.organizersService.remove(id);
    return { success: true };
  }

  @Post(':slug/verify')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('Organizer verified successfully')
  @ApiOperation({ summary: 'Verify organizer (Admin only)' })
  @ApiResponse({ status: 200, description: 'Organizer verified successfully' })
  @ApiResponse({ status: 404, description: 'Organizer not found' })
  async verifyOrganizer(@Param('slug') slug: string) {
    const organizer = await this.organizersService.findBySlug(slug);
    if (!organizer) {
      throw new Error('Organizer not found');
    }
    return this.organizersService.verifyOrganizer(organizer.id);
  }
}
