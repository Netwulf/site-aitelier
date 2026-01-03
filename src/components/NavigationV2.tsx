import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "@/components/LanguageToggle";

export const NavigationV2 = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation('common');
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'pt';

  const navItems = [
    { label: currentLang === 'en' ? "School" : "Escola", href: `/${currentLang}/${currentLang === 'en' ? 'school' : 'escola'}` },
    { label: "Studio", href: `/${currentLang}/studio` },
    { label: "Playground", href: `/${currentLang}/playground` },
    { label: currentLang === 'en' ? "Contact" : "Contato", href: `/${currentLang}/${currentLang === 'en' ? 'contact' : 'contato'}` },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-ancestral-black/90 backdrop-blur-sm border-b border-text-muted/10"
          : "bg-transparent"
      )}
    >
      <nav
        className="max-w-[1400px] mx-auto px-6 py-4
                      flex justify-between items-center"
      >
        <Link to={`/${currentLang}/`} className="flex items-center gap-2">
          <img
            src="/logo-aitelier.png"
            alt="AI.TELIER"
            className="h-14 md:h-16 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm text-text-secondary hover:text-ancestral-white
                        transition-colors font-mono-v2"
            >
              {item.label}
            </Link>
          ))}

          {/* Language Toggle */}
          <LanguageToggle className="ml-4" />
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-ancestral-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="font-mono-v2 text-sm">
            {mobileMenuOpen ? "[X]" : "[Menu]"}
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ancestral-black border-t border-text-muted/10">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block text-sm text-text-secondary hover:text-ancestral-white
                          transition-colors font-mono-v2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Language Toggle */}
            <div className="pt-4 border-t border-text-muted/10">
              <LanguageToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavigationV2;
