import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { dateTransformer } from '../../../common/utils/helper';
import { UserRole, UserStatus, BloodGroup, Gender, TShirtSize } from '../types';
import { Organizer } from 'src/modules/organizer/entities/organizer.entity';

@Entity('users')
export class User {
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

  @Column({ name: 'thana', nullable: true })
  thana?: string;

  @Column({ name: 'ocupation', nullable: true })
  ocupation?: string;

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

  @Column({ name: 'facebook_id', nullable: true })
  facebookId?: string;

  @Column({ name: 'linkedin_id', nullable: true })
  linkedinId?: string;

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

  @OneToMany(() => Organizer, (organizer) => organizer.user)
organizers!: Organizer[];

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string;

  @Column({
    name: 'last_login_at',
    type: 'timestamp',
    nullable: true,
    transformer: dateTransformer,
  })
  lastLoginAt?: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  declare createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  declare updatedAt: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  declare deletedAt?: string;

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
