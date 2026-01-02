import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-brutal-black relative overflow-hidden">
      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
        }}
      />

      {/* Subtle glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-matrix-green/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="text-center z-10 px-4">
        {/* Error code label */}
        <p className="text-matrix-green text-sm font-mono uppercase tracking-widest mb-6">
          [ERROR_404]
        </p>

        {/* Large 404 with glitch effect */}
        <h1
          className="text-7xl md:text-9xl font-bold text-brutal-white mb-6 relative"
          style={{
            textShadow: '2px 2px 0px rgba(0, 255, 65, 0.3), -2px -2px 0px rgba(255, 0, 65, 0.2)'
          }}
        >
          404
        </h1>

        {/* Poetic message */}
        <p className="text-xl md:text-2xl text-brutal-white/70 font-serif italic mb-4 max-w-md mx-auto">
          Esta frequência não existe no sistema
        </p>

        {/* Technical detail */}
        <p className="text-sm text-brutal-white/40 font-mono mb-10">
          route: {location.pathname}
        </p>

        {/* Return button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-matrix-green text-brutal-black font-bold uppercase tracking-wider hover:bg-matrix-green/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,65,0.4)]"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar ao Portal
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
