import React from 'react'

type StatusType = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled' | 'active' | 'inactive'

interface StatusBadgeProps {
  status: StatusType
  label?: string
  size?: 'sm' | 'md'
}

const statusConfig: Record<StatusType, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-300', label: 'Pending' },
  assigned: { bg: 'bg-blue-500/20', text: 'text-blue-300', label: 'Assigned' },
  in_progress: { bg: 'bg-cyan-500/20', text: 'text-cyan-300', label: 'In Progress' },
  completed: { bg: 'bg-green-500/20', text: 'text-green-300', label: 'Completed' },
  cancelled: { bg: 'bg-red-500/20', text: 'text-red-300', label: 'Cancelled' },
  active: { bg: 'bg-green-500/20', text: 'text-green-300', label: 'Active' },
  inactive: { bg: 'bg-slate-500/20', text: 'text-slate-300', label: 'Inactive' },
}

export function StatusBadge({ status, label, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status]
  const displayLabel = label || config.label

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs font-medium' 
    : 'px-2.5 py-1 text-sm font-medium'

  return (
    <span className={`inline-flex items-center rounded-full ${config.bg} ${config.text} ${sizeClasses}`}>
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${config.text} mr-1.5`} />
      {displayLabel}
    </span>
  )
}
