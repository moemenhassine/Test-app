import { useContext, useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { ThemeContext } from '@/contexts/ThemeContext';

/**
 * Hook to get the current color scheme
 * Uses ThemeContext if available, otherwise falls back to system theme
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme(): 'light' | 'dark' {
  const context = useContext(ThemeContext);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (context) {
    return context.currentTheme;
  }

  // Fallback to system theme if ThemeContext is not available
  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme ?? 'light';
  }

  return 'light';
}
