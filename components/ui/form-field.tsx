import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FieldError } from 'react-hook-form'

interface FormFieldProps {
  label: string
  placeholder?: string
  error?: FieldError
  required?: boolean
  type?: string
  disabled?: boolean
  className?: string
  [key: string]: any
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, placeholder, error, required, type = 'text', disabled, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={props.id} className={`text-sm font-medium ${error ? 'text-red-600' : 'text-gray-200'}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`${
            error 
              ? 'border-red-500 bg-red-950/20 focus:border-red-500 focus:ring-red-500' 
              : 'border-slate-700 bg-slate-800 text-white placeholder:text-slate-400 focus:border-yellow-400 focus:ring-yellow-400'
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400 mt-1" role="alert">
            {error.message}
          </p>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'
