import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeInUpSimple, staggerContainer } from "@/utils/motionVariants";

// Gallery images - cinematic nature (Apichatpong/Tarkovsky style)
import forestPath from "@/assets/gallery/forest-path-cinematic.png";
import waterReflection from "@/assets/gallery/water-reflection-cinematic.png";
import treeCircuitry from "@/assets/gallery/tree-circuitry.png";

// Gallery images - urban brutalist style
import concreteVoid from "@/assets/gallery/concrete-void.png";
import overpassSolitude from "@/assets/gallery/overpass-solitude.png";
import industrialLight from "@/assets/gallery/industrial-light.png";

// Gallery images - rotoscope style
import windowMoment from "@/assets/gallery/window-moment.png";
import cafeConversation from "@/assets/gallery/cafe-conversation.png";
import streetWalk from "@/assets/gallery/street-walk.png";

// Gallery images - liminal hybrid
import thresholdFigure from "@/assets/gallery/threshold-figure.png";
import studioCreate from "@/assets/gallery/studio-create.png";

const galleryImages = [
  { src: forestPath, alt: "Forest path - morning mist", category: "Cinema" },
  { src: concreteVoid, alt: "Concrete void - urban journey", category: "Urban Poetry" },
  { src: windowMoment, alt: "Window moment - contemplation", category: "Narrative" },
  { src: waterReflection, alt: "Water reflection - stillness", category: "Cinema" },
  { src: overpassSolitude, alt: "Overpass solitude - outsider", category: "Urban Poetry" },
  { src: thresholdFigure, alt: "Threshold - transformation", category: "Transition" },
  { src: treeCircuitry, alt: "Tree circuitry - organic tech", category: "Nature & Tech" },
  { src: cafeConversation, alt: "Cafe conversation - dialogue", category: "Narrative" },
  { src: industrialLight, alt: "Industrial light - revelation", category: "Urban Poetry" },
  { src: streetWalk, alt: "Street walk - discovery", category: "Narrative" },
  { src: studioCreate, alt: "Studio creation - craft", category: "Transition" },
];

const ArtGallery = () => {
  const { ref, isInView } = useInViewOptimized({ once: true, threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden bg-brutal-black">
      {/* Background glow */}
      <div className="organic-glow" style={{ top: "50%", left: "30%" }} />

      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial="hidden"
        animate={isInView && !prefersReducedMotion ? "visible" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto max-w-7xl relative z-10"
      >
        {/* Section Header */}
        <motion.div variants={fadeInUpSimple} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-concrete-border flex-1 max-w-24" />
            <span className="code-text text-sm text-matrix-green">VISUAL.ARCHIVE</span>
            <div className="h-px bg-concrete-border flex-1 max-w-24" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brutal-white uppercase tracking-tighter mb-6">
            Imagem, Cinema e Manifesto
          </h2>
          <p className="text-lg text-brutal-white/60 max-w-2xl mx-auto">
            Storytelling não vive só em palavras. Ele ganha corpo em imagem,
            tempo em cinema e permanência em sistemas.
          </p>
        </motion.div>

        {/* Masonry Gallery Grid */}
        <motion.div
          variants={fadeInUpSimple}
          className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="break-inside-avoid group relative overflow-hidden"
            >
              <div className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover filter saturate-[0.9] contrast-[1.05] brightness-[0.95]
                           transition-all duration-700 group-hover:saturate-100 group-hover:brightness-100"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brutal-black/80 via-transparent to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Category label on hover */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="code-text text-xs text-matrix-green">{image.category}</span>
                </div>
                {/* Green accent border on hover */}
                <div className="absolute inset-0 border-2 border-matrix-green/0 group-hover:border-matrix-green/30
                              transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom quote */}
        <motion.div variants={fadeInUpSimple} className="text-center mt-16">
          <div className="w-24 h-px bg-matrix-green mx-auto mb-8" />
          <p className="poetic-text text-lg md:text-xl text-brutal-white/70 italic">
            "Cada projeto nasce de uma identidade diferente. O olhar é o mesmo."
          </p>
        </motion.div>
      </motion.div>

      {/* Subtle grid */}
      <div className="brutal-grid absolute inset-0 opacity-3" />
    </section>
  );
};

export default ArtGallery;
