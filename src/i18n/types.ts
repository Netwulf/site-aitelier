import 'i18next';
import type common from './locales/pt-BR/common.json';

// Type-safe translation keys
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
    };
  }
}

// Export types for use in components
export type TranslationNamespace = 'common';

export interface TranslationResources {
  common: typeof common;
}
