// Packages
import { ReactElement } from 'react';
import { Shuffle as ShuffleIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Components
import { Button } from '@/components/ui/button';

export const ChangeTenantButton = (): ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [seachParams] = useSearchParams();

  const handleChangeTenant = () => {
    navigate('/sign-in');
  };

  if (!seachParams.get('tenant')) {
    return <></>;
  }

  return (
    <Button
      id="change-tenant-btn"
      type="button"
      size="sm"
      className="flex items-center justify-center"
      onClick={handleChangeTenant}
    >
      <ShuffleIcon />{' '}
      <span className="hidden md:block">{t('changeTenant')}</span>
    </Button>
  );
};
