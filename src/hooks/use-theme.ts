// Packages
import { useContext } from 'react';

// Contexts
import { ThemeProviderContext } from '@/contexts/theme-provider';

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
