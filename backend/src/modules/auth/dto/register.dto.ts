import { CreateUserDto } from '../../users/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/types';

export class RegisterDto extends CreateUserDto {
  @ApiProperty({ required: false, enum: UserRole })
  role?: UserRole;
}
