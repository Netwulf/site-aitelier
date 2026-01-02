
import React, { useState, useEffect } from 'react';
import { useCheckoutModal } from '@/contexts/CheckoutModalContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { openCheckoutModal } = useCheckoutModal();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setIsVisible(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isVisible
        ? `${isScrolled ? 'bg-neutral-0 border-b border-neutral-200' : 'bg-transparent'} translate-y-0 opacity-100`
        : '-translate-y-full opacity-0'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/lovable-uploads/logo-aitelier-v2.png"
              alt="Aitelier"
              className="h-12 md:h-16 object-contain"
            />
          </div>

          <button
            onClick={openCheckoutModal}
            className="btn-brutal text-sm md:text-base py-2 px-4 md:px-6"
          >
            <span>GARANTIR VAGA</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
