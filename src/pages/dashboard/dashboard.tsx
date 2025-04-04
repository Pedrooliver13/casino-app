// Packages
import { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';

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
    <>
      <Helmet title={'Dashboard'} />

      <div>
        <Button
          type="button"
          variant="default"
          size="icon"
          onClick={handleSignOut}
        >
          Sair
        </Button>
      </div>
    </>
  );
};
