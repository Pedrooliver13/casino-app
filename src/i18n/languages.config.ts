// Packages
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// i18n
import { signInTranslates } from '@/i18n/pagesTranslates/sign-in.translates';
import { usersTranslates } from '@/i18n/pagesTranslates/users.translates';
import { appSidebarTranslates } from '@/i18n/componentsTranslates/app-sidebar.translates';

const resources = {
  pt: {
    translation: {
      languages: {
        portuguese: 'Português Brasil',
        english: 'Inglês',
        spanish: 'Espanhol',
        french: 'Francês',
      },
      genericRequestError:
        'Ocorreu um erro ao processar a requisição. Por favor, tente novamente mais tarde.',
      changeTenant: 'Alterar tenant',
      appSidebar: appSidebarTranslates.pt,
      signIn: signInTranslates.pt,
      users: usersTranslates.pt,
    },
  },
  en: {
    translation: {
      languages: {
        portuguese: 'Portuguese Brazil',
        english: 'English',
        spanish: 'Español',
        french: 'Français',
      },
      genericRequestError:
        'An error occurred while processing the request. Please try again later.',
      changeTenant: 'Change tenant',
      appSidebar: appSidebarTranslates.en,
      signIn: signInTranslates.en,
      users: usersTranslates.en,
    },
  },
  fr: {
    translation: {
      languages: {
        portuguese: 'Portugais Brésil',
        english: 'Anglais',
        spanish: 'Espagnol',
        french: 'Français',
      },
      genericRequestError:
        'An error occurred while processing the request. Please try again later.',
      changeTenant: 'Changer de locataire',
      appSidebar: appSidebarTranslates.fr,
      signIn: signInTranslates.fr,
      users: usersTranslates.fr,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
