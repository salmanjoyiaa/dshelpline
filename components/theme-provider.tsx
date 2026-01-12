'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      enableColorScheme={false}
      storageKey="theme-mode"
      themes={['light', 'dark']}
      forcedTheme={undefined}
    >
      {children}
    </NextThemesProvider>
  )
}
