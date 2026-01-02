import { motion } from "framer-motion";
import { NavigationV2 } from "@/components/NavigationV2";
import { FooterV2 } from "@/components/FooterV2";
import { OnePersonStudioSection } from "@/components/OnePersonStudioSection";
import { CoursesNetflixGallery } from "@/components/CoursesNetflixGallery";
import { EstudosEntry } from "@/components/EstudosEntry";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Estudos = () => {
  useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-ancestral-black">
      <NavigationV2 />

      <main>
        {/* Hero - Escola */}
        <section className="pt-32 pb-16 px-6 bg-ancestral-black">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="font-mono-v2 text-sm text-matrix-green mb-4 tracking-widest">
                ONDE_SE_FORMA_A_LINGUAGEM
              </p>
              <h1 className="font-display text-hero text-ancestral-white leading-none mb-8">
                Escola
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary max-w-2xl leading-relaxed">
                Formamos quem cria.
                <br />
                <span className="text-ancestral-white">Não quem reproduz.</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* One Person Studio Section - The main pitch */}
        <OnePersonStudioSection />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* COMECE AQUI - Orientation Block */}
        <section className="py-16 px-6 bg-ancestral-black border-b border-matrix-green/20">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-8 md:p-12 border-2 border-matrix-green bg-matrix-green/5"
            >
              <div className="absolute -top-4 left-8 px-4 py-1 bg-ancestral-black">
                <span className="font-mono-v2 text-sm text-matrix-green tracking-widest">
                  COMECE AQUI
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl text-ancestral-white font-bold mb-4">
                Se você está chegando agora, o primeiro passo é{" "}
                <span className="text-matrix-green">ZERO→ONE</span>.
              </h3>
              <p className="text-lg text-text-secondary max-w-3xl mb-6">
                É o curso fundação. Do pensamento à forma, do vazio à obra.
                Depois você escolhe sua trilha: One Person Studio · Storytelling · Produção Visual · Tech...
              </p>
              <p className="font-mono-v2 text-sm text-matrix-green/70">
                // Menos operadores. Mais autores.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* Courses Netflix Gallery - Organized by categories */}
        <CoursesNetflixGallery />

        {/* Brutal Line Divider */}
        <div className="brutal-line-glow" />

        {/* Entry CTA */}
        <section className="py-24 md:py-32 px-6 bg-ancestral-black">
          <EstudosEntry />
        </section>
      </main>

      <FooterV2 />
    </div>
  );
};

export default Estudos;
