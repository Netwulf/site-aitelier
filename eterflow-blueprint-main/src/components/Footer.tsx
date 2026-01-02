
import React from 'react';

const Footer = () => {
  return (
    <footer className="relative py-8 bg-neutral-0 border-t border-neutral-200">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <img
            src="/lovable-uploads/logo-aitelier-v2.png"
            alt="AI.TELIER"
            className="h-6 mx-auto mb-3 opacity-80"
          />
          <p className="text-neutral-500 text-sm font-mono">
            © {new Date().getFullYear()} AI.TELIER
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
