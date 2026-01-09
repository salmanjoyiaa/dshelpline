import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ServiceRequest, VALID_STATUS_TRANSITIONS } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Check if a status transition is valid
 */
export function isValidStatusTransition(
  currentStatus: ServiceRequest['status'],
  newStatus: ServiceRequest['status']
): boolean {
  return VALID_STATUS_TRANSITIONS[currentStatus].includes(newStatus)
}

/**
 * Get available status transitions for current status
 */
export function getAvailableTransitions(
  currentStatus: ServiceRequest['status']
): ServiceRequest['status'][] {
  return VALID_STATUS_TRANSITIONS[currentStatus]
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Format date and time to readable string
 */
export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Get status badge color for UI
 */
export function getStatusColor(status: ServiceRequest['status']): string {
  const colors: Record<ServiceRequest['status'], string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    assigned: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-gray-100 text-gray-800',
  }
  return colors[status]
}

/**
 * Get status display name
 */
export function getStatusLabel(status: ServiceRequest['status']): string {
  const labels: Record<ServiceRequest['status'], string> = {
    pending: 'Pending',
    assigned: 'Assigned',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
  }
  return labels[status]
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number format
 */
export function isValidPhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length === 10
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
