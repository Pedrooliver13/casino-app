// Packages
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  UsersRound as UsersRoundIcon,
  LayoutDashboard as LayoutDashboardIcon,
} from 'lucide-react';

// Components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { AppSidebarNavUser } from '@/components/core/app-sidebar/app-sidebar-nav-user';

const sidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
};

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>): ReactElement {
  const { t } = useTranslation();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"></div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Dopabet</span>
            <span className="truncate text-xs">{t('since')} (01/04/2023)</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {t('components.appSidebar.screens')}
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={t('components.appSidebar.dashboard')}
              >
                <Link to={'/'} onClick={() => setOpenMobile(false)}>
                  <LayoutDashboardIcon />
                  <span>{t('components.appSidebar.dashboard')}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={t('components.appSidebar.user')}
              >
                <Link to={'/users'} onClick={() => setOpenMobile(false)}>
                  <UsersRoundIcon />
                  <span>{t('components.appSidebar.user')}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <AppSidebarNavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
