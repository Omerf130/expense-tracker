import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import he from './he.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      he: { translation: he }
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    supportedLngs: ['en', 'he'],
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;