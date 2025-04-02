// Packages
import { Route, Routes } from 'react-router-dom';
import { ReactElement } from 'react';

// Pages
import { SignIn } from '@/pages/sing-in/sign-in';
import { Users } from '@/pages/users/users';
import { Dashboard } from '@/pages/dashboard/dashboard';

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
    </Route>

    <Route element={<AuthLayout />}>
      <Route path="/sign-in" element={<SignIn />} />
    </Route>
  </Routes>
);
