import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { DEFAULT_SHORT_CODE } from '@/i18n';

// Route translations between languages
const ROUTE_TRANSLATIONS: Record<string, Record<string, string>> = {
  pt: {
    '/school': '/escola',
    '/contact': '/contato',
    '/archive': '/arquivo',
  },
  en: {
    '/escola': '/school',
    '/contato': '/contact',
    '/arquivo': '/archive',
  },
};

export function useLocalizedNavigate() {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || DEFAULT_SHORT_CODE;

  const localizedNavigate = useCallback(
    (path: string, options?: { replace?: boolean }) => {
      // If path already has language prefix, use as-is
      if (path.match(/^\/(pt|en)\//)) {
        navigate(path, options);
        return;
      }

      // Otherwise, add current language prefix
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      const localizedPath = `/${currentLang}${cleanPath}`;
      navigate(localizedPath, options);
    },
    [navigate, currentLang]
  );

  // Create a link with current language
  const createLink = useCallback(
    (path: string): string => {
      if (path.match(/^\/(pt|en)\//)) {
        return path;
      }
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `/${currentLang}${cleanPath}`;
    },
    [currentLang]
  );

  // Switch to a different language, translating route if needed
  const switchLanguage = useCallback(
    (newLang: string, currentPath: string) => {
      // Remove current language prefix
      const pathWithoutLang = currentPath.replace(/^\/(pt|en)/, '') || '/';

      // Translate the route if needed
      const translations = ROUTE_TRANSLATIONS[newLang] || {};
      const translatedPath = translations[pathWithoutLang] || pathWithoutLang;

      return `/${newLang}${translatedPath}`;
    },
    []
  );

  return {
    navigate: localizedNavigate,
    createLink,
    switchLanguage,
    currentLang,
  };
}

export default useLocalizedNavigate;
