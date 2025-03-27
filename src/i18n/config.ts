// Packages
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to',
      email: 'E-mail',
      password: 'Password',
      login: 'Login',
      invalidEmail: 'Invalid email',
      signInSuccess: 'Sign in success',
      ByClickingContinueYouAgreeToOur: 'By clicking continue you agree to our',
      termsOfService: 'Terms of Service',
      and: 'and',
      privacyPolicy: 'Privacy Policy',
      languages: {
        english: 'English',
        spanish: 'Español',
        french: 'Français',
      },
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue à',
      email: 'E-mail',
      signInSuccess: 'Connexion réussie',
      invalidEmail: 'E-mail invalide',
      password: 'Mot de passe',
      login: 'Connexion',
      ByClickingContinueYouAgreeToOur:
        'En cliquant sur continuer, vous acceptez nos',
      termsOfService: "Conditions d'utilisation",
      and: 'et',
      privacyPolicy: 'Politique de confidentialité',
      languages: {
        english: 'English',
        spanish: 'Español',
        french: 'Français',
      },
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
