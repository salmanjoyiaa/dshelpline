import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="mb-4 p-3 dark:bg-yellow-500/10 bg-yellow-100 rounded-lg">
        <Icon className="w-8 h-8 dark:text-yellow-400 text-yellow-600" />
      </div>
      <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">{title}</h3>
      <p className="dark:text-slate-400 text-gray-600 text-center max-w-sm mb-6">{description}</p>
      {action && (
        <Button
          onClick={action.onClick}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}
