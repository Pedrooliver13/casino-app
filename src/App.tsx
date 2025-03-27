// Packages
import { RouterProvider } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';

// Components
import { ThemeProvider } from '@/components/themes/theme-provider';

// Contexts
import { LanguageProvider } from '@/contexts/languageContext';

// Routes
import { router } from '@/routes';

// Styles
import './global.css';

export const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="casino:theme">
      <HelmetProvider>
        <LanguageProvider>
          <Helmet titleTemplate="%s | casino.app" />

          <RouterProvider router={router} />

          <Toaster />
        </LanguageProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
};
