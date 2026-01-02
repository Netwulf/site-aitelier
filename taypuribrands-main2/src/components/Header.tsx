
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setIsVisible(scrollY > 100); // Show header after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('formulario-aplicacao');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isVisible 
        ? `${isScrolled ? 'glass border-b border-white/5' : 'bg-transparent'} translate-y-0 opacity-100` 
        : '-translate-y-full opacity-0'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Aitelier Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/logo-aitelier-v2.png" 
              alt="Aitelier"
              className="h-12 md:h-16 object-contain"
            />
          </div>
          
          <button 
            onClick={scrollToForm}
            className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-6 md:px-8 py-2 md:py-3 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-glow-green-strong hover:from-emerald-400 hover:to-teal-500 magnetic group"
          >
            <span className="relative z-10 text-sm md:text-base">PREENCHER APLICAÇÃO</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping rounded-xl" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
