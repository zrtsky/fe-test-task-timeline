import { FC } from 'react'

import { DarkModeToggler } from '@/entities/dark-mode-toggler'

export const Welcome: FC = () => (
  <div className="mb-4 space-y-3">
    <h1 className="text-2xl font-semibold">Welcome to the Test task timeline 👋</h1>
    <DarkModeToggler />
  </div>
)
