import { cva } from 'class-variance-authority'
import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/shared/lib/utils'

const cardStyles = cva('rounded-lg border', {
  variants: {
    intent: {
      default:
        'border-neutral-200 bg-white text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50',
      success: 'border-green-500 bg-green-50 text-green-900 dark:bg-green-900/30 dark:text-green-50',
      danger: 'border-red-500 bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-50',
      warning: 'border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-50',
      info: 'border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-900/30 dark:text-blue-50',
    },
  },
  defaultVariants: {
    intent: 'default',
  },
})

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info'
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, variant, ...props }, ref) => (
  <div ref={ref} className={cn(cardStyles({ intent: variant }), className)} {...props} />
))
Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
)
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  ),
)
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm text-neutral-500 dark:text-neutral-400', className)} {...props} />
  ),
)
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />,
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  ),
)
CardFooter.displayName = 'CardFooter'

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
