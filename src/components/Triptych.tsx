import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface TriptychItem {
  title: string;
  subtitle: string;
  href: string;
  cta?: string;
}

interface TriptychProps {
  items: TriptychItem[];
}

export const Triptych = ({ items }: TriptychProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {items.map((item, index) => (
        <Link
          key={item.title}
          to={item.href}
          className="group relative overflow-hidden
                     bg-brutal-black border-2 border-concrete-border
                     hover:border-matrix-green
                     transition-all duration-300
                     p-8 md:p-10"
        >
          {/* Number indicator */}
          <div className="absolute top-4 right-4 font-mono text-6xl md:text-7xl font-bold
                          text-matrix-green/20 group-hover:text-matrix-green/40
                          transition-colors select-none">
            0{index + 1}
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-bold text-brutal-white uppercase tracking-tight mb-4
                           group-hover:text-matrix-green transition-colors">
              {item.title}
            </h3>

            {/* Subtitle */}
            <p className="text-brutal-white/70 text-base md:text-lg leading-relaxed mb-8">
              {item.subtitle}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-2 text-matrix-green font-mono text-sm uppercase tracking-wider
                            group-hover:gap-4 transition-all">
              <span>{item.cta || "Entrar"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-matrix-green/0 to-matrix-green/5
                          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-matrix-green
                          transform scale-x-0 group-hover:scale-x-100
                          transition-transform origin-left" />
        </Link>
      ))}
    </div>
  );
};
