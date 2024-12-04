'use client'

import { ComponentProps, forwardRef, useId } from 'react'

import { cn } from '@/shared/lib/utils'

type InputProps = ComponentProps<'input'> & {
  label?: string
  errorText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, errorText, ...props }, ref) => {
    const id = props.id || useId()

    return (
      <div className="relative">
        {label && (
          <label
            className="mb-2 block text-sm font-medium text-neutral-800 dark:text-neutral-300"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          className={cn(
            'flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 md:text-sm',
            className,
          )}
          ref={ref}
          {...props}
        />
        {errorText && (
          <span className="absolute -bottom-6 left-0 max-w-full text-xs text-red-500">{errorText}</span>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
