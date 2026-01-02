import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const ToolTeaser = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-28 border-t border-b border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Label */}
          <span className="font-mono-v2 text-xs tracking-widest text-tech-olive mb-6 block">
            FERRAMENTA
          </span>

          {/* Headline */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display text-warm-ivory mb-4">
            Quer ver como enxergamos voce?
          </h2>

          {/* Subtext */}
          <p className="text-warm-ivory/50 text-lg mb-8">
            Uma ferramenta. Uma leitura. Um ponto de partida.
          </p>

          {/* CTA */}
          <Link
            to="/studio"
            className="inline-flex items-center gap-2
                     border border-warm-ivory/30 px-6 py-3
                     text-warm-ivory font-mono-v2 text-sm tracking-wider
                     hover:border-tech-olive hover:text-tech-olive
                     transition-all duration-300"
          >
            [Experimentar] <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolTeaser;
