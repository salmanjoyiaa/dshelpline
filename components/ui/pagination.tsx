import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('flex items-center justify-between px-6 py-4 border-t border-slate-700/30', className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>

function PaginationLink({
  className,
  isActive,
  size = 'sm',
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size={size}
      className={cn(
        isActive
          ? 'bg-yellow-500 text-black hover:bg-yellow-600'
          : 'border-slate-600/50 text-slate-300 hover:bg-slate-700',
        className
      )}
      {...(props as any)}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<'a'>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="sm"
      className={cn('gap-1', className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<'a'>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="sm"
      className={cn('gap-1', className)}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      className={cn('flex h-9 w-9 items-center justify-center text-slate-400', className)}
      {...props}
    >
      <span className="sr-only">More pages</span>
      ...
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
