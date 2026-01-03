import { motion } from "framer-motion";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { SHORT_CODE_TO_LANG, LANG_SHORT_CODES, type SupportedLanguage } from "@/i18n";

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

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();

  const currentLang = lang || 'pt';
  const isPortuguese = currentLang === 'pt';

  const handleSwitch = () => {
    const newLang = isPortuguese ? 'en' : 'pt';
    const newLocale = SHORT_CODE_TO_LANG[newLang] as SupportedLanguage;

    // Get path without language prefix
    const pathWithoutLang = location.pathname.replace(/^\/(pt|en)/, '') || '/';

    // Translate route if needed
    const translations = ROUTE_TRANSLATIONS[newLang] || {};
    const translatedPath = translations[pathWithoutLang] || pathWithoutLang;

    // Change i18n language
    i18n.changeLanguage(newLocale);

    // Save preference
    localStorage.setItem('aitelier-language', newLocale);

    // Navigate to new language URL
    navigate(`/${newLang}${translatedPath}`, { replace: true });
  };

  return (
    <motion.button
      onClick={handleSwitch}
      className={cn(
        "flex items-center gap-1 font-mono-v2 text-xs uppercase tracking-wider",
        "hover:opacity-70 transition-opacity",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPortuguese ? "Switch to English" : "Mudar para Português"}
    >
      <span
        className={cn(
          "transition-all duration-200",
          isPortuguese ? "text-matrix-green font-bold" : "text-brutal-white opacity-60"
        )}
      >
        PT
      </span>
      <span className="text-brutal-white opacity-40">|</span>
      <span
        className={cn(
          "transition-all duration-200",
          !isPortuguese ? "text-matrix-green font-bold" : "text-brutal-white opacity-60"
        )}
      >
        EN
      </span>
    </motion.button>
  );
}

export default LanguageToggle;
