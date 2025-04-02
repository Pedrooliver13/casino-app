// Packages
import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

// Components
import { Header } from '@/components/core/header';
import { AppSidebar } from '@/components/core/app-sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const DefaultLayout = (): ReactElement => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />

        <main className="px-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
