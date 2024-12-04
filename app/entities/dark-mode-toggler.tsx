'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { FC, useCallback } from 'react'

import { Button } from '@/shared/ui'

export const DarkModeToggler: FC = () => {
  const { setTheme, theme } = useTheme()

  const handleToggleTheme = useCallback(() => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [setTheme, theme])

  return (
    <Button variant="outline" onClick={handleToggleTheme}>
      {theme === 'light' ? <Moon /> : <Sun />}
      {theme === 'light' ? 'Dark' : 'Light'} mode
    </Button>
  )
}
