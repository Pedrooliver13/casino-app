// Packages
import { RouterProvider } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Components
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/themes/theme-provider';

// Contexts
import { LanguageProvider } from '@/contexts/languageContext';
import { AuthProvider } from '@/contexts/authContext';

// Routes
import { router } from '@/router/routes';

// Styles
import './global.css';

export const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="casino:theme">
      <HelmetProvider>
        <LanguageProvider>
          <Helmet titleTemplate="%s | casino.app" />

          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>

          <Toaster />
        </LanguageProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
};
