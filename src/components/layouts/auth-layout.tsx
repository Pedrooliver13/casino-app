// Packages
import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

// Components
import { ThemeToggle } from '@/components/core/theme-toggle';
import { LanguageToggle } from '@/components/core/language-toggle';
import { ChangeTenantButton } from '@/components/shared/change-tenant-button';

export const AuthLayout = (): ReactElement => {
  return (
    <>
      <header className="flex items-center gap-2 px-2 pt-2">
        <ThemeToggle />
        <LanguageToggle />
        <ChangeTenantButton />
      </header>

      <Outlet />
    </>
  );
};
