import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeInUpSimple } from "@/utils/motionVariants";

const Partners = () => {
  const { ref, isInView } = useInViewOptimized({ once: true });
  const prefersReducedMotion = useReducedMotion();

  // Empresas - linha de cima
  const companies = [
    "GOOGLE",
    "NVIDIA",
    "CORTEX ACADEMY",
    "HOLLYWOOD FILM ACADEMY",
    "ACADEMIA LENDÁRIA",
    "SBT",
    "CONQUER",
  ];

  // Nomes - linha de baixo
  const people = [
    "ALAN NICOLAS",
    "ALEXANDRA LORAS",
    "DAVI RIBAS",
    "GABRIEL MARCONDES",
    "FELIPE MARINHO",
    "CAROLINA ARSLANIAN",
    "MARIE BRANDÃO",
    "PEDRO VALÉRIO",
  ];

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden bg-zinc-100 border-y-4 border-brutal-black">
      {/* Bauhaus geometric elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-matrix-green/10 rotate-12" />
      <div className="absolute bottom-10 right-1/3 w-24 h-24 rounded-full border-4 border-brutal-black/10" />
      <motion.div
        ref={ref as any}
        initial="hidden"
        animate={isInView && !prefersReducedMotion ? "visible" : "hidden"}
        variants={fadeInUpSimple}
        className="container mx-auto max-w-7xl relative z-10"
      >

        {/* Empresas - linha de cima */}
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-12 md:gap-20 animate-[scroll_30s_linear_infinite]">
            {[...companies, ...companies, ...companies, ...companies].map((company, index) => (
              <div
                key={`${company}-${index}`}
                className="flex-shrink-0 text-2xl md:text-4xl font-black text-brutal-black/25 hover:text-matrix-green transition-colors duration-500 tracking-tighter uppercase whitespace-nowrap"
              >
                {company}
              </div>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-1 bg-brutal-black/10 w-full my-12" />

        {/* Nomes - linha de baixo */}
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-12 md:gap-20 animate-[scroll-reverse_35s_linear_infinite]">
            {[...people, ...people, ...people, ...people].map((person, index) => (
              <div
                key={`${person}-${index}`}
                className="flex-shrink-0 text-xl md:text-3xl font-black text-brutal-black/15 hover:text-brutal-black transition-colors duration-500 tracking-tight uppercase whitespace-nowrap"
              >
                {person}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Custom animations */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        @keyframes scroll-reverse {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Partners;
