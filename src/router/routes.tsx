import { AuthGuard } from './authGuard';

// Packages
import { createBrowserRouter } from 'react-router-dom';

// Pages
import { SignIn } from '@/pages/singIn/signIn';
import { Dashboard } from '@/pages/dashboard/dashboard';

// Components
import { AuthLayout } from '@/components/layouts/authLayout';
import { DefaultLayout } from '@/components/layouts/defaultLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard isPrivate>
        <DefaultLayout />,
      </AuthGuard>
    ),
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
    ],
  },
]);
