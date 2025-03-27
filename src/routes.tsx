// Packages
import { createBrowserRouter } from 'react-router-dom';

// Pages
import { AuthLayout } from '@/pages/_layouts/auth';
import { SignIn } from '@/pages/auth/sign-in';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [{ path: '/', element: <SignIn /> }],
  },
]);
