import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
  IsOptional,
  IsDate,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole, BloodGroup, Gender, TShirtSize } from '../types';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'SecurePass123!' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password!: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  lastName!: string;

  @ApiPropertyOptional({ example: 'Johnny' })
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(30)
  nickName?: string;

  @ApiPropertyOptional({ example: '+8801234567890' })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'Dhaka University' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  instituteName?: string;

  @ApiPropertyOptional({ example: 'Dhaka' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  district?: string;

  @ApiPropertyOptional({ example: '2000-07-02' })
  @IsString()
  @IsOptional()
  dob?: string;

  @ApiPropertyOptional({ enum: BloodGroup, example: BloodGroup.A_POSITIVE })
  @IsEnum(BloodGroup)
  @IsOptional()
  bloodGroup?: BloodGroup;

  @ApiPropertyOptional({ enum: Gender, example: Gender.MALE })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiPropertyOptional({ enum: TShirtSize, example: TShirtSize.M })
  @IsEnum(TShirtSize)
  @IsOptional()
  tshirtSize?: TShirtSize;
}

export class RegisterDto extends CreateUserDto {
  @ApiPropertyOptional({ enum: UserRole, default: UserRole.USER })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
