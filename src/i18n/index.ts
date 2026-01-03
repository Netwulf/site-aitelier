import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import PT-BR locale files
import ptBRCommon from './locales/pt-BR/common.json';
import ptBRHome from './locales/pt-BR/home.json';
import ptBRContact from './locales/pt-BR/contact.json';
import ptBRStudio from './locales/pt-BR/studio.json';
import ptBRSchool from './locales/pt-BR/school.json';
import ptBRFooter from './locales/pt-BR/footer.json';
import ptBRPortfolio from './locales/pt-BR/portfolio.json';

// Import EN-US locale files
import enUSCommon from './locales/en-US/common.json';
import enUSHome from './locales/en-US/home.json';
import enUSContact from './locales/en-US/contact.json';
import enUSStudio from './locales/en-US/studio.json';
import enUSSchool from './locales/en-US/school.json';
import enUSFooter from './locales/en-US/footer.json';
import enUSPortfolio from './locales/en-US/portfolio.json';

// Supported languages
export const SUPPORTED_LANGUAGES = ['pt-BR', 'en-US'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Language short codes for URL
export const LANG_SHORT_CODES: Record<SupportedLanguage, string> = {
  'pt-BR': 'pt',
  'en-US': 'en',
};

export const SHORT_CODE_TO_LANG: Record<string, SupportedLanguage> = {
  'pt': 'pt-BR',
  'en': 'en-US',
};

// Default language
export const DEFAULT_LANGUAGE: SupportedLanguage = 'pt-BR';
export const DEFAULT_SHORT_CODE = 'pt';

// Namespaces
export const NAMESPACES = ['common', 'home', 'contact', 'studio', 'school', 'footer', 'portfolio'] as const;
export type Namespace = typeof NAMESPACES[number];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': {
        common: ptBRCommon,
        home: ptBRHome,
        contact: ptBRContact,
        studio: ptBRStudio,
        school: ptBRSchool,
        footer: ptBRFooter,
        portfolio: ptBRPortfolio,
      },
      'en-US': {
        common: enUSCommon,
        home: enUSHome,
        contact: enUSContact,
        studio: enUSStudio,
        school: enUSSchool,
        footer: enUSFooter,
        portfolio: enUSPortfolio,
      },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    defaultNS: 'common',
    ns: [...NAMESPACES],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
      lookupLocalStorage: 'aitelier-language',
    },
    react: {
      useSuspense: false, // Disable suspense to avoid issues with lazy loading
    },
  });

export default i18n;
