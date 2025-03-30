// Packages
import { useTranslation } from 'react-i18next';

// Components
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Contexts
import { useLanguage } from '@/contexts/languageContext';

const LANGUAGES = [
  { code: 'pt', label: 'portuguese' },
  { code: 'en', label: 'english' },
  { code: 'fr', label: 'french' },
];

export function LanguageToggle() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  const currentLanguageLabel =
    LANGUAGES.find((lang) => lang.code === currentLanguage)?.code || 'En';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="uppercase" variant="outline" size="icon">
          {currentLanguageLabel}
          <span className="sr-only">Language {currentLanguageLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
          >
            {t(`languages.${language.label}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
