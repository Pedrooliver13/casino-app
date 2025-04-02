// Packages
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

export const Users = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <div>
      <header>
        <h1 className="text-lg">{t('users.allUsers')}</h1>
      </header>
    </div>
  );
};
