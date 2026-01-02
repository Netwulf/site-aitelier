import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { fadeInUpSimple } from "@/utils/motionVariants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Community = () => {
  const { ref, isInView } = useInViewOptimized({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const photos = [
    { src: "/placeholder.svg", alt: "Workshop presencial" },
    { src: "/placeholder.svg", alt: "Aluna criando" },
    { src: "/placeholder.svg", alt: "Call síncrona" },
    { src: "/placeholder.svg", alt: "Projeto sendo desenvolvido" },
    { src: "/placeholder.svg", alt: "Comunidade reunida" },
    { src: "/placeholder.svg", alt: "Portfolio review" },
  ];

  return (
    <section className="py-20 md:py-32 bg-white" ref={ref as any}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Texto (Swiss) */}
          <motion.div
            className="md:col-span-5"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={prefersReducedMotion ? {} : fadeInUpSimple}
          >
            <div className="code-text text-xs mb-4 text-brutal-black">&gt; COMMUNITY</div>
            <h2 className="text-brutal-black mb-6">
              COMUNIDADE<br />DE CRIADORES
            </h2>
            <p className="text-brutal-black/70 text-lg mb-6">
              Mais de 200 artistas, designers e escritores usando IA de forma autoral.
            </p>
            <p className="text-brutal-black/60 mb-8">
              Encontros presenciais, calls semanais, Discord ativo 24h e mentorias individuais. 
              Você não aprende sozinho.
            </p>
            <button className="border-2 border-brutal-black px-8 py-4 text-brutal-black hover:bg-brutal-black hover:text-white transition-all duration-300 uppercase tracking-wider text-sm font-medium">
              Entrar na Comunidade
            </button>
          </motion.div>

          {/* Grid de fotos (7 cols) */}
          <motion.div
            className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={prefersReducedMotion ? {} : fadeInUpSimple}
          >
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                className="aspect-square overflow-hidden border-2 border-brutal-black/10 hover:border-brutal-black transition-colors duration-300"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Community;
