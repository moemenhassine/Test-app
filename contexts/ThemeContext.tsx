/**
 * Theme Context
 * Provides theme state and toggle function throughout the app
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { useThemeToggle, ThemePreference } from '@/hooks/use-theme-toggle';

type ThemeContextType = {
  themePreference: ThemePreference;
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  setThemePreference: (preference: ThemePreference) => Promise<void>;
  isLoading: boolean;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useThemeToggle();

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

