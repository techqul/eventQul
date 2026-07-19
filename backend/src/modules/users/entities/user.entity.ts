import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '../../../common/entities/base.entity';
import { dateTransformer } from '../../../common/entities/base.entity';
import { UserRole, UserStatus, BloodGroup, Gender, TShirtSize } from '../types';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ name: 'first_name' })
  firstName!: string;

  @Column({ name: 'last_name' })
  lastName!: string;

  @Column({ name: 'nick_name', nullable: true })
  nickName?: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber?: string;

  @Column({ name: 'institute_name', nullable: true })
  instituteName?: string;

  @Column({ name: 'district', nullable: true })
  district?: string;

  @Column({ name: 'dob', type: 'varchar', length: '50', nullable: true })
  dob?: string;

  @Column({
    name: 'blood_group',
    type: 'enum',
    enum: BloodGroup,
    nullable: true,
  })
  bloodGroup?: BloodGroup;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender?: Gender;

  @Column({
    name: 'tshirt_size',
    type: 'enum',
    enum: TShirtSize,
    nullable: true,
  })
  tshirtSize?: TShirtSize;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  status!: UserStatus;

  @Column({ name: 'email_verified', default: false })
  emailVerified!: boolean;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string;

  @Column({ name: 'last_login_at', type: 'timestamp', nullable: true, transformer: dateTransformer })
  lastLoginAt?: string;

  // Method to validate password
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  // Remove password from JSON response
  toJSON() {
    const { password: _password, ...rest } = this;
    return rest;
  }
}
