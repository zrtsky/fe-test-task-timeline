'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ComponentProps } from 'react'

export const Providers = ({ children, ...props }: ComponentProps<typeof NextThemesProvider>) => (
  <NextThemesProvider {...props}>{children}</NextThemesProvider>
)
