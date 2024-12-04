import { forwardRef, useId } from 'react'
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize'

import { cn } from '@/shared/lib/utils'

type TextareaProps = TextareaAutosizeProps & {
  label?: string
  errorText?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, errorText, ...props }, ref) => {
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
        <TextareaAutosize
          className={cn(
            'flex min-h-[80px] w-full resize-none rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 md:text-sm',
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
Textarea.displayName = 'Textarea'

export { Textarea }
