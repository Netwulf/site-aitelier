import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANG_SHORT_CODES,
  SHORT_CODE_TO_LANG,
  type SupportedLanguage
} from '@/i18n';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  shortCode: string;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
  isPortuguese: boolean;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'aitelier-language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(
    (i18n.language as SupportedLanguage) || DEFAULT_LANGUAGE
  );

  // Sync state with i18n
  useEffect(() => {
    const handleLanguageChange = (lang: string) => {
      if (SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)) {
        setCurrentLanguage(lang as SupportedLanguage);
      }
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    setCurrentLanguage(lang);
  }, [i18n]);

  const toggleLanguage = useCallback(() => {
    const newLang = currentLanguage === 'pt-BR' ? 'en-US' : 'pt-BR';
    setLanguage(newLang);
  }, [currentLanguage, setLanguage]);

  const value: LanguageContextType = {
    currentLanguage,
    shortCode: LANG_SHORT_CODES[currentLanguage],
    setLanguage,
    toggleLanguage,
    isPortuguese: currentLanguage === 'pt-BR',
    isEnglish: currentLanguage === 'en-US',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Utility to get language from URL path
export function getLanguageFromPath(pathname: string): SupportedLanguage | null {
  const match = pathname.match(/^\/(pt|en)(\/|$)/);
  if (match) {
    return SHORT_CODE_TO_LANG[match[1]] || null;
  }
  return null;
}

// Utility to create localized path
export function createLocalizedPath(path: string, lang: SupportedLanguage): string {
  const shortCode = LANG_SHORT_CODES[lang];
  const cleanPath = path.replace(/^\/(pt|en)/, '');
  return `/${shortCode}${cleanPath || '/'}`;
}
