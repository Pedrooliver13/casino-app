// Packages
import { ReactElement } from 'react';

// Components
import { Button } from '@/components/ui/button';

// Hooks
import { useAuthContext } from '@/hooks/use-auth';

export const Dashboard = (): ReactElement => {
  const { signOut } = useAuthContext();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Button type="button" variant="default" size="icon" onClick={handleSignOut}>
      Sair
    </Button>
  );
};
