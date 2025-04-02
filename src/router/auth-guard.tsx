// Hooks
import { useAuthContext } from '@/hooks/use-auth';

// Packages
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  isPrivate: boolean;
  children: React.ReactNode;
}

export function AuthGuard({ isPrivate, children }: AuthGuardProps) {
  const { signedIn } = useAuthContext();

  if (!signedIn && isPrivate) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
