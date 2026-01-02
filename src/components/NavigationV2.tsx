import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "ai.telier", href: "/atelier" },
  { label: "Escola", href: "/escola" },
  { label: "Studio", href: "/studio" },
  { label: "Playground", href: "/playground" },
];

export const NavigationV2 = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <Link to="/" className="flex items-center gap-2">
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
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-ancestral-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="font-mono-v2 text-sm">
            {mobileMenuOpen ? "[Fechar]" : "[Menu]"}
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
          </div>
        </div>
      )}
    </header>
  );
};

export default NavigationV2;
