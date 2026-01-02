import { Mail, Instagram, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brutal-black border-t-2 border-concrete-border">
      <div className="brutal-container max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <img
                src="/logo-aitelier.png"
                alt="AI.TELIER"
                className="h-16 md:h-20 w-auto mb-4"
              />
              <p className="code-text text-xs">STUDIO_DE_STORYTELLING_E_IDENTIDADE</p>
            </div>

            {/* Newsletter - Substack Embed */}
            <div className="max-w-md">
              <p className="text-brutal-white/70 text-sm mb-4">
                Receba reflexões sobre identidade, storytelling e presença digital.
              </p>
              <iframe
                src="https://taynapuri.substack.com/embed"
                width="100%"
                height="150"
                style={{ border: 'none', background: 'transparent' }}
                frameBorder="0"
                scrolling="no"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="code-text text-xs text-matrix-green uppercase tracking-widest mb-6">
              Navegação
            </h4>
            <nav className="flex flex-col gap-3">
              <a
                href="#work"
                className="text-brutal-white/70 hover:text-matrix-green transition-colors text-sm uppercase tracking-wider"
              >
                Work
              </a>
              <a
                href="/studio"
                className="text-brutal-white/70 hover:text-matrix-green transition-colors text-sm uppercase tracking-wider"
              >
                Studio
              </a>
              <a
                href="#journal"
                className="text-brutal-white/70 hover:text-matrix-green transition-colors text-sm uppercase tracking-wider"
              >
                Journal
              </a>
              <a
                href="/contact"
                className="text-brutal-white/70 hover:text-matrix-green transition-colors text-sm uppercase tracking-wider"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="code-text text-xs text-matrix-green uppercase tracking-widest mb-6">
              Contato
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:taypuri@aitelier.com.br"
                className="flex items-center gap-3 text-brutal-white/70 hover:text-matrix-green transition-colors group"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">taypuri@aitelier.com.br</span>
              </a>

              <a
                href="https://instagram.com/aitelier.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-brutal-white/70 hover:text-matrix-green transition-colors group"
              >
                <Instagram className="w-4 h-4" />
                <span className="text-sm">@aitelier.studio</span>
              </a>

              <div className="flex items-start gap-3 text-brutal-white/50">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-sm">Florianópolis · Curitiba · Brasília · São José dos Campos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-concrete-border">
        <div className="brutal-container max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-brutal-white/40 text-xs code-text">
              © {new Date().getFullYear()} AI.TELIER
            </p>
            <p className="text-brutal-white/40 text-xs code-text">
              [SYSTEM_STATUS: ONLINE]
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
