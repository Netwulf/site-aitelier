export const FooterV2 = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-text-muted/20">
      <div className="max-w-[1400px] mx-auto">
        <div
          className="flex flex-col md:flex-row justify-between items-center
                        gap-6 text-sm text-text-muted"
        >
          {/* Logo/Name */}
          <div>
            <img
              src="/logo-aitelier.png"
              alt="AI.TELIER"
              className="h-20 md:h-24 w-auto"
            />
          </div>

          {/* Contact */}
          <div className="flex items-center gap-6 font-mono-v2">
            <a
              href="mailto:contato@ai.telier"
              className="hover:text-ancestral-white transition-colors"
            >
              contato@ai.telier
            </a>
            <a
              href="https://instagram.com/ai.telier"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ancestral-white transition-colors"
            >
              @ai.telier
            </a>
          </div>

          {/* Copyright */}
          <div className="text-text-muted/60">© {currentYear}</div>
        </div>

        {/* Bases */}
        <div className="mt-8 pt-6 border-t border-text-muted/10">
          <p className="text-xs text-text-muted/50 font-mono-v2 text-center mb-2">
            PRESENÇA
          </p>
          <p className="text-sm text-text-muted/70 text-center">
            Florianópolis · Curitiba · São José dos Campos · Brasília
            <span className="text-matrix-green/60 ml-2">e crescendo</span>
          </p>
        </div>

        {/* Tagline */}
        <div className="mt-6 text-center">
          <p className="text-xs text-text-muted/40 font-mono-v2 tracking-widest">
            O FUTURO É ANCESTRAL
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterV2;
