import { z } from 'zod';

/**
 * Organizer Form Validation Schema
 * Defines validation rules for organizer creation/editing forms
 */

const urlRegex = /^https?:\/\/.+/i;
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const organizerFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),

  slug: z
    .string()
    .min(1, 'Slug is required')
    .min(2, 'Slug must be at least 2 characters')
    .max(100, 'Slug must not exceed 100 characters')
    .regex(slugRegex, 'Slug must contain only lowercase letters, numbers, and hyphens'),

  logo: z
    .string()
    .min(1, 'Logo URL is required')
    .url('Invalid logo URL')
    .or(z.literal('')),

  banner: z
    .string()
    .url('Invalid banner URL')
    .optional()
    .or(z.literal('')),

  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),

  socialLinks: z.object({
    facebook: z.string().url('Invalid Facebook URL').optional().or(z.literal('')),
    instagram: z.string().url('Invalid Instagram URL').optional().or(z.literal('')),
    twitter: z.string().url('Invalid Twitter URL').optional().or(z.literal('')),
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  }).optional(),
});

export type OrganizerFormData = z.infer<typeof organizerFormSchema>;

/**
 * Schema for creating new organizer
 */
export const organizerCreateSchema = organizerFormSchema;

export type OrganizerCreateFormData = z.infer<typeof organizerCreateSchema>;

/**
 * Schema for editing organizer (all fields optional)
 */
export const organizerEditSchema = organizerFormSchema.partial();

export type OrganizerEditFormData = z.infer<typeof organizerEditSchema>;
