import { z } from 'zod'

// Provider Validation Schema (Create)
export const providerSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z.string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format')
    .min(10, 'Phone must be at least 10 characters'),
  status: z.enum(['active', 'inactive']).default('active'),
  rating: z.number().min(0).max(5).default(0),
  total_jobs_completed: z.number().min(0).default(0),
})

export type ProviderFormData = z.infer<typeof providerSchema>

// Provider Validation Schema (Edit)
export const providerEditSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z.string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format')
    .min(10, 'Phone must be at least 10 characters'),
  status: z.enum(['active', 'inactive']),
})

export type ProviderEditFormData = z.infer<typeof providerEditSchema>

// Request Validation Schema (Create)
export const requestSchema = z.object({
  customer_name: z.string()
    .min(2, 'Customer name must be at least 2 characters')
    .max(100, 'Customer name must be less than 100 characters'),
  customer_phone: z.string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format')
    .min(10, 'Phone must be at least 10 characters'),
  customer_address: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(255, 'Address must be less than 255 characters'),
  problem_description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  assigned_provider_id: z.string().optional().or(z.literal('')),
})

export type RequestFormData = z.infer<typeof requestSchema>

// Request Validation Schema (Edit - Status & Provider only)
export const requestEditSchema = z.object({
  status: z.enum(['pending', 'assigned', 'in_progress', 'completed', 'cancelled']),
  assigned_provider_id: z.string().optional().or(z.literal('')),
})

export type RequestEditFormData = z.infer<typeof requestEditSchema>
