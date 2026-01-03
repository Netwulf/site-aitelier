import { useEffect } from 'react';
import { useParams, Outlet, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SHORT_CODE_TO_LANG, DEFAULT_SHORT_CODE, type SupportedLanguage } from '@/i18n';

const SUPPORTED_LANG_CODES = ['pt', 'en'];

export function LocalizedRoutes() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const location = useLocation();

  // Validate language code
  if (!lang || !SUPPORTED_LANG_CODES.includes(lang)) {
    // Redirect to default language, preserving the path
    const pathWithoutLang = location.pathname.replace(/^\/(pt|en)/, '') || '/';
    return <Navigate to={`/${DEFAULT_SHORT_CODE}${pathWithoutLang}`} replace />;
  }

  // Sync i18next with URL language
  useEffect(() => {
    const targetLang = SHORT_CODE_TO_LANG[lang] as SupportedLanguage;
    if (targetLang && i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }
  }, [lang, i18n]);

  return <Outlet />;
}

export default LocalizedRoutes;
