import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { galleryReveal, staggerContainerPremium, fadeInUpSimple, imageZoom } from "@/utils/motionVariants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useParallax } from "@/hooks/useParallax";
import { OptimizedImage } from "@/components/OptimizedImage";

// V3 Brutalista: Unica cor de accent
const TECH_OLIVE = "#8dc75e";

// Story 3.3: Gallery with reveal animations
const Gallery = () => {
  const { ref, isInView } = useInViewOptimized({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const works = [
    { image: "/placeholder.svg", title: "Identidade Visual com Midjourney", author: "Ana Silva, Turma 02", tools: ["Midjourney", "Figma"] },
    { image: "/placeholder.svg", title: "Podcast Clone de Voz", author: "Carlos Mendes, Turma 01", tools: ["ElevenLabs", "Audacity"] },
    { image: "/placeholder.svg", title: "Série Editorial Generativa", author: "Marina Costa, Turma 03", tools: ["ChatGPT", "Runway"] },
    { image: "/placeholder.svg", title: "Animação 3D com IA", author: "Pedro Santos, Turma 02", tools: ["Spline", "Stable Diffusion"] },
    { image: "/placeholder.svg", title: "Revista Digital Híbrida", author: "Juliana Rocha, Turma 01", tools: ["Claude", "Photoshop"] },
    { image: "/placeholder.svg", title: "Soundscape Generativo", author: "Lucas Ferreira, Turma 03", tools: ["Suno", "Ableton"] },
  ];

  return (
    <section className="py-20 md:py-32 bg-warm-ivory relative" ref={ref as any}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with stagger */}
        <motion.div
          className="mb-20 border-l-4 border-void-black pl-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={prefersReducedMotion ? {} : staggerContainerPremium}
        >
          <motion.div
            className="code-text text-xs mb-4 text-void-black"
            variants={fadeInUpSimple}
          >
            &gt; STUDENT_GALLERY
          </motion.div>
          <motion.h2
            className="text-void-black mb-6"
            variants={fadeInUpSimple}
          >
            TRABALHOS<br />DOS ALUNOS
          </motion.h2>
          <motion.p
            className="poetic-text text-lg text-void-black/70 max-w-2xl"
            variants={fadeInUpSimple}
          >
            Projetos reais criados por nossa comunidade. Da ideia à execução usando IA como ferramenta criativa.
          </motion.p>
        </motion.div>

        {/* Masonry Grid with reveal animations */}
        <motion.div
          className="masonry-grid"
          variants={staggerContainerPremium}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {works.map((work, i) => (
            <GalleryCard key={i} work={work} index={i} isInView={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Story 3.3: Gallery Card with reveal animation
const GalleryCard = ({ work, index, isInView }: any) => {
  const { ref, y } = useParallax(30);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={`gallery-card group ${index % 2 === 0 ? 'row-span-2' : ''}`}
      variants={prefersReducedMotion ? {} : galleryReveal}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      <div className="relative h-full overflow-hidden">
        {/* Image with zoom on hover */}
        <motion.div
          style={prefersReducedMotion ? {} : { y }}
          className="h-full"
          variants={imageZoom}
          initial="rest"
          whileHover="hover"
        >
          <OptimizedImage
            src={work.image}
            alt={work.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* V3: Overlay with tech-olive - animated */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(to top, ${TECH_OLIVE}cc, transparent)`
          }}
        />

        {/* Info with slide up animation */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-6"
          initial={{ y: "100%", opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <h4 className="text-white text-xl mb-2 font-bold">{work.title}</h4>
          <p className="text-white/80 text-sm mb-3">{work.author}</p>
          <div className="flex gap-2 flex-wrap">
            {work.tools.map((tool: string, i: number) => (
              <motion.span
                key={tool}
                className="text-xs bg-void-black/80 text-warm-ivory px-2 py-1 border border-warm-ivory/20"
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Corner accent line - Story 3.3 */}
        <motion.div
          className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-white/50"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

export default Gallery;
