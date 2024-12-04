import '@/shared/styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Providers } from '@/shared/providers'

export const metadata: Metadata = {
  title: 'Timeline test task',
  description: 'This is a test task for Timeline project',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

type RootLayoutProps = Readonly<{
  children: ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://fav.farm/🔥" />
      </head>
      <body className={twMerge(inter.variable, 'font-sans')}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <main className="container w-fit">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
