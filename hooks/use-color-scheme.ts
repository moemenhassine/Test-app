import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

/**
 * Hook to get the current color scheme
 * Uses ThemeContext if available, otherwise falls back to system theme
 */
export function useColorScheme(): 'light' | 'dark' {
  const context = useContext(ThemeContext);
  
  if (context) {
    return context.currentTheme;
  }
  
  // Fallback to system theme if ThemeContext is not available
  const { useColorScheme: useRNColorScheme } = require('react-native');
  return useRNColorScheme() ?? 'light';
}
