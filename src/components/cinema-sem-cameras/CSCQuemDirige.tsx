import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const CSCQuemDirige = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const credentials = [
    "Ex-CEO da Hollywood Film Academy",
    "Formou milhares de cineastas em produção tradicional",
    "Fundador do ai.telier",
    "Pioneiro em cinema impulsionado por IA no Brasil",
  ];

  return (
    <section
      id="quem-dirige"
      ref={ref}
      className="relative py-24 md:py-32 bg-ancestral-black overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image column */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Image container with cinematic treatment */}
            <div className="relative aspect-[4/5] overflow-hidden">
              {/* Placeholder or actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-stone-dark to-ancestral-black" />

              {/* If you have an image, use it here */}
              <img
                src="/tayna-portraits/tayna-1.jpg"
                alt="Taynã Puri - Fundador do ai.telier"
                className="absolute inset-0 w-full h-full object-cover cinematic-filter"
                onError={(e) => {
                  // Hide if image doesn't exist
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />

              {/* Film grain overlay */}
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

              {/* Border frame */}
              <div className="absolute inset-0 border border-text-muted/20" />
            </div>

            {/* Caption */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex-1 h-px bg-text-muted/20" />
              <span className="text-xs font-mono-v2 text-text-muted tracking-widest">
                TAYNÃ PURI • FUNDADOR
              </span>
              <div className="flex-1 h-px bg-text-muted/20" />
            </div>
          </motion.div>

          {/* Content column */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-xs font-mono-v2 text-text-muted tracking-widest block mb-4">
              {">"} QUEM_DIRIGE.profile
            </span>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-ancestral-white mb-6">
              Taynã{" "}
              <span className="text-tech-olive">Puri</span>
            </h2>

            <div className="space-y-6 mb-8">
              <p className="text-xl text-ancestral-white/90 leading-relaxed">
                Deixei a Hollywood Film Academy porque vi o futuro chegando.
              </p>

              <p className="text-lg text-text-secondary leading-relaxed">
                Depois de formar milhares de cineastas no modelo tradicional —
                equipes grandes, orçamentos altos, processos longos —
                percebi que a IA estava prestes a mudar tudo.
              </p>

              <p className="text-lg text-text-secondary leading-relaxed">
                Não era mais sobre ter recursos.
                <br />
                Era sobre ter <span className="text-ancestral-white">visão</span>.
              </p>

              <p className="text-lg text-text-secondary leading-relaxed">
                Fundei o ai.telier para unir o conhecimento profundo de cinema
                com o poder das novas tecnologias. Para criar um lugar onde
                pessoas com visão pudessem finalmente realizar suas obras.
              </p>
            </div>

            {/* Credentials */}
            <div className="space-y-3 mb-8">
              {credentials.map((credential, index) => (
                <motion.div
                  key={credential}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-2 h-2 bg-tech-olive" />
                  <span className="text-sm text-text-muted">{credential}</span>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.blockquote
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="p-6 border-l-4 border-tech-olive bg-stone-dark/30"
            >
              <p className="text-lg font-display text-ancestral-white italic">
                "Este curso é tudo que eu gostaria de ter tido quando comecei.
                Cinema de verdade, sem as barreiras de sempre."
              </p>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CSCQuemDirige;
