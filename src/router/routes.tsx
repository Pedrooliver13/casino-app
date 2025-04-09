// Packages
import { Route, Routes } from 'react-router-dom';
import { ReactElement } from 'react';

// Pages
import { SignIn } from '@/pages/sing-in/sign-in';
import { Dashboard } from '@/pages/dashboard/dashboard';
import { Users } from '@/pages/users/users';
import { UserShow } from '@/pages/users/[id]/userShow';

// Components
import { AuthLayout } from '@/components/layouts/auth-layout';
import { DefaultLayout } from '@/components/layouts/default-layout';

// Routes
import { AuthGuard } from '@/router/auth-guard';

export const Router = (): ReactElement => (
  <Routes>
    <Route
      element={
        <AuthGuard isPrivate>
          <DefaultLayout />
        </AuthGuard>
      }
    >
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<UserShow />} />
    </Route>

    <Route element={<AuthLayout />}>
      <Route path="/sign-in" element={<SignIn />} />
    </Route>
  </Routes>
);
