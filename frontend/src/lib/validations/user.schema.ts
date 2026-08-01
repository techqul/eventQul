import { z } from 'zod';
import { UserRole, BloodGroup, Gender, TShirtSize } from '@/types/user';

/**
 * User Form Validation Schema
 * Defines validation rules for user creation/editing forms
 */

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phoneRegex = /^[+]?[\d\s-]{10,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const userFormSchema = z.object({
  // Required fields
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(emailRegex, 'Invalid email format')
    .email('Invalid email address'),

  // Password is optional for checkout (will be auto-generated)
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      passwordRegex,
      'Password must contain uppercase, lowercase, number, and special character',
    )
    .optional(),

  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),

  // Optional fields
  nickName: z.string().max(30, 'Nickname must not exceed 30 characters').optional().or(z.literal('')),

  phoneNumber: z
    .string()
    .regex(phoneRegex, 'Invalid phone number format')
    .optional()
    .or(z.literal('')),

  instituteName: z
    .string()
    .max(100, 'Institute name must not exceed 100 characters')
    .optional()
    .or(z.literal('')),

  district: z
    .string()
    .max(50, 'District must not exceed 50 characters')
    .optional()
    .or(z.literal('')),

  dob: z
    .string()
    .refine((val) => !val || !isNaN(Date.parse(val)), 'Invalid date format')
    .optional()
    .or(z.literal('')),

  bloodGroup: z.enum([BloodGroup.A_POSITIVE, BloodGroup.A_NEGATIVE, BloodGroup.AB_POSITIVE, BloodGroup.AB_NEGATIVE, BloodGroup.B_POSITIVE, BloodGroup.B_NEGATIVE, BloodGroup.O_POSITIVE, BloodGroup.O_NEGATIVE]).optional(),

  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]).optional(),

  tshirtSize: z.enum([TShirtSize.XS, TShirtSize.S, TShirtSize.M, TShirtSize.L, TShirtSize.XL, TShirtSize.XXL, TShirtSize.XXXL]).optional(),

  role: z.enum([UserRole.USER, UserRole.ORGANIZER, UserRole.ADMIN]),
});

export type UserFormData = z.infer<typeof userFormSchema>;

/**
 * Schema for creating new user (password required)
 */
export const userCreateSchema = userFormSchema.extend({
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(
      passwordRegex,
      'Password must contain uppercase, lowercase, number, and special character',
    ),
});

export type UserCreateFormData = z.infer<typeof userCreateSchema>;

/**
 * Schema for editing user (password optional)
 */
export const userEditSchema = userFormSchema
  .extend({
    password: z.string().optional(),
  })
  .partial();

export type UserEditFormData = z.infer<typeof userEditSchema>;
