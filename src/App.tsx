// Packages
import { BrowserRouter } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Components
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/contexts/theme-provider';

// Contexts
import { LanguageProvider } from '@/contexts/language-context';
import { AuthProvider } from '@/contexts/auth-context';

// Routes
import { Router } from '@/router/routes';

// Styles
import './global.css';

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="casino:theme">
      <HelmetProvider>
        <LanguageProvider>
          <Helmet titleTemplate="%s | casino.app" />

          <BrowserRouter>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </BrowserRouter>

          <Toaster />
        </LanguageProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
};
