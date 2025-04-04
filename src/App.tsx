// Packages
import { BrowserRouter } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Components
import { Toaster } from '@/components/ui/toaster';

// Contexts
import { ThemeProvider } from '@/contexts/theme-provider';
import { LanguageProvider } from '@/contexts/language-context';
import { AuthProvider } from '@/contexts/auth-context';

// Routes
import { Router } from '@/router/routes';

// Libs
import { queryClient } from '@/libs/react-query';

// Styles
import './global.css';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

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
    </QueryClientProvider>
  );
};
