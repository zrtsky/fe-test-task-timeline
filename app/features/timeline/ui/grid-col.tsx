import { FC, HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '@/shared/lib/utils'

type GridColProps = PropsWithChildren<{
  first?: boolean
  lastCol?: boolean
  noPadding?: boolean
}> &
  HTMLAttributes<HTMLDivElement>

export const GridCol: FC<GridColProps> = ({ className, children, first, lastCol, noPadding, ...rest }) => (
  <div
    {...rest}
    className={cn(
      'min-w-fit border border-b-0 border-l-0 border-gray-300 px-4 py-3 dark:border-gray-600',
      first && 'border-l-1',
      lastCol && 'border-b-1',
      noPadding && 'p-0',
      className,
    )}
  >
    {children}
  </div>
)
