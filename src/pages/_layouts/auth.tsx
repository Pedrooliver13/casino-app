// Packages
import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

// Components
import { ThemeToggle } from '@/components/themes/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';

export const AuthLayout = (): ReactElement => {
  return (
    <>
      <header className="flex gap-2 px-2 pt-2">
        <ThemeToggle />
        <LanguageToggle />
      </header>
      <div className="flex flex-col items-center justify-center gap-6 bg-background p-6 md:min-h-[90vh] md:p-10">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </>
  );
};
