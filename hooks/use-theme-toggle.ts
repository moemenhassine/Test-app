/**
 * Custom hook to manage theme toggle with persistence
 * Stores user preference in AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

const THEME_STORAGE_KEY = '@app_theme_preference';

export type ThemePreference = 'light' | 'dark' | 'system';

export function useThemeToggle() {
  const systemTheme = useRNColorScheme();
  const [themePreference, setThemePreference] = useState<ThemePreference>('system');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  /**
   * Load theme preference from AsyncStorage
   */
  const loadThemePreference = async () => {
    try {
      const savedPreference = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedPreference && ['light', 'dark', 'system'].includes(savedPreference)) {
        setThemePreference(savedPreference as ThemePreference);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Save theme preference to AsyncStorage
   */
  const saveThemePreference = async (preference: ThemePreference) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, preference);
      setThemePreference(preference);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  /**
   * Toggle between light and dark (ignoring system)
   */
  const toggleTheme = () => {
    const newTheme = themePreference === 'light' ? 'dark' : 'light';
    saveThemePreference(newTheme);
  };

  /**
   * Get the actual theme to use (resolves 'system' to actual system theme)
   */
  const getCurrentTheme = (): 'light' | 'dark' => {
    if (themePreference === 'system') {
      return systemTheme ?? 'light';
    }
    return themePreference;
  };

  return {
    themePreference,
    currentTheme: getCurrentTheme(),
    toggleTheme,
    setThemePreference: saveThemePreference,
    isLoading,
  };
}

